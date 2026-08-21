"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { CoverCopy } from "@/i18n/cover";
import { CLOSED_FORMAT } from "./config";
import { PhysicalBook } from "./hardcover/PhysicalBook";
import { BOOK, bookTotalDepth } from "./hardcover/dimensions";
import { PhysicalBinder } from "./binder/PhysicalBinder";
import { BINDER, binderTotalDepth } from "./binder/dimensions";

interface BookSceneProps {
  copy: CoverCopy;
  onOpen: () => void;
  zoom?: number;
}

const CLICK_PX = 7;
/** Face-on rest pose — book sits straight until the user drags. */
const REST_X = 0;
const REST_Y = 0;

function ClosedPhysical({
  copy,
  coverOpenRef,
}: {
  copy: CoverCopy;
  coverOpenRef: MutableRefObject<number>;
}) {
  if (CLOSED_FORMAT === "hardcover") {
    return <PhysicalBook copy={copy} coverOpenRef={coverOpenRef} />;
  }
  return <PhysicalBinder copy={copy} coverOpenRef={coverOpenRef} />;
}

function DraggableBook({
  copy,
  onOpen,
  zoom,
}: {
  copy: CoverCopy;
  onOpen: () => void;
  zoom: number;
}) {
  const group = useRef<THREE.Group>(null);
  const coverOpenRef = useRef(0);
  const { gl } = useThree();
  const rot = useRef({ x: REST_X, y: REST_Y });
  const vel = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const drag = useRef<{
    active: boolean;
    x: number;
    y: number;
    ox: number;
    oy: number;
    moved: number;
    lt: number;
  } | null>(null);
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;

    coverOpenRef.current = 0;
    g.scale.setScalar(
      THREE.MathUtils.damp(g.scale.x, zoomRef.current, 7, dt),
    );
    g.position.set(0, 0, 0);

    if (!drag.current?.active) {
      vel.current.x *= 0.88;
      vel.current.y *= 0.88;
      const coasting =
        Math.abs(vel.current.x) > 0.00008 || Math.abs(vel.current.y) > 0.00008;
      if (coasting) {
        rot.current.x = THREE.MathUtils.clamp(
          rot.current.x + vel.current.x,
          -0.75,
          0.75,
        );
        rot.current.y += vel.current.y;
      } else {
        vel.current.x = 0;
        vel.current.y = 0;
        /* Unwrap yaw to [-π, π] then settle face-on */
        const y =
          THREE.MathUtils.euclideanModulo(rot.current.y + Math.PI, Math.PI * 2) -
          Math.PI;
        rot.current.x = THREE.MathUtils.damp(rot.current.x, REST_X, 5, dt);
        rot.current.y = THREE.MathUtils.damp(y, REST_Y, 5, dt);
      }
    }

    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rot.current.x, 16, dt);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, rot.current.y, 16, dt);
  });

  useEffect(() => {
    const el = gl.domElement;

    const onMove = (e: PointerEvent) => {
      if (!drag.current?.active) return;
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      drag.current.moved = Math.max(drag.current.moved, Math.hypot(dx, dy));

      const nextX = THREE.MathUtils.clamp(
        drag.current.ox + dy * 0.004,
        -0.75,
        0.75,
      );
      const nextY = drag.current.oy + dx * 0.0075;

      const now = performance.now();
      const dlt = Math.max(16, now - drag.current.lt);
      vel.current = {
        x: ((nextX - rot.current.x) / dlt) * 14,
        y: ((nextY - rot.current.y) / dlt) * 14,
      };
      drag.current.lt = now;
      rot.current.x = nextX;
      rot.current.y = nextY;
    };

    const onUp = (e: PointerEvent) => {
      if (!drag.current?.active) return;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const wasClick = drag.current.moved < CLICK_PX;
      drag.current = null;
      if (wasClick) onOpenRef.current();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [gl]);

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    gl.domElement.setPointerCapture(e.pointerId);
    drag.current = {
      active: true,
      x: e.clientX,
      y: e.clientY,
      ox: rot.current.x,
      oy: rot.current.y,
      moved: 0,
      lt: performance.now(),
    };
    vel.current = { x: 0, y: 0 };
  };

  return (
    <group
      ref={group}
      rotation={[REST_X, REST_Y, 0]}
      onPointerDown={onPointerDown}
    >
      <ClosedPhysical copy={copy} coverOpenRef={coverOpenRef} />
      <BookFollowShadow />
    </group>
  );
}

/** Soft oval under the hardcover — child of the drag group so it travels with every tilt. */
function BookFollowShadow() {
  const binder = CLOSED_FORMAT === "binder";
  const halfH = (binder ? BINDER.height : BOOK.height) / 2;
  const halfW = (binder ? BINDER.width : BOOK.width) / 2;
  const depth = binder ? binderTotalDepth() : bookTotalDepth();
  const map = useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.08,
      size / 2,
      size / 2,
      size * 0.5,
    );
    g.addColorStop(0, "rgba(42,38,32,0.55)");
    g.addColorStop(0.45, "rgba(42,38,32,0.22)");
    g.addColorStop(1, "rgba(42,38,32,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <mesh
      position={[0, -halfH - 0.02, 0.02]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[halfW * 2.35, depth * 3.4, 1]}
      renderOrder={-1}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={map}
        transparent
        opacity={binder ? 0.9 : 0.85}
        depthWrite={false}
      />
    </mesh>
  );
}

function BookContactShadow({ zoom }: { zoom: number }) {
  const halfH =
    (CLOSED_FORMAT === "binder" ? BINDER.height : BOOK.height) / 2;
  const y = -(halfH * zoom) - 0.06;
  const binder = CLOSED_FORMAT === "binder";

  return (
    <ContactShadows
      position={[0, y, 0]}
      opacity={binder ? 0.2 : 0.16}
      scale={Math.max(4.5, 5.6 * zoom)}
      blur={4.5}
      far={Math.max(2.6, 3.4 * zoom)}
      resolution={512}
      color={binder ? "#1a1012" : "#2a2620"}
      frames={Infinity}
    />
  );
}

function Lights() {
  const binder = CLOSED_FORMAT === "binder";
  return (
    <>
      <ambientLight
        intensity={binder ? 0.62 : 0.86}
        color={binder ? "#fff4f0" : "#fff8f0"}
      />
      <hemisphereLight
        intensity={binder ? 0.32 : 0.48}
        color="#fffaf2"
        groundColor={binder ? "#3a1a1e" : "#e4d8c6"}
      />
      <directionalLight
        castShadow
        position={[3.4, 3.8, 2.6]}
        intensity={binder ? 0.78 : 0.88}
        color="#fff6e8"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={14}
        shadow-camera-left={-2.5}
        shadow-camera-right={2.5}
        shadow-camera-top={2.5}
        shadow-camera-bottom={-2.5}
        shadow-bias={-0.00015}
      />
      <directionalLight
        position={[-2.6, 1.4, 1.2]}
        intensity={binder ? 0.18 : 0.22}
        color={binder ? "#e8d4c8" : "#f0e8dc"}
      />
      <directionalLight
        position={[1.2, 0.6, 3.8]}
        intensity={binder ? 0.12 : 0.2}
        color="#fffaf2"
      />
      {binder ? (
        <directionalLight
          position={[-1.2, 2.2, -1.5]}
          intensity={0.22}
          color="#eef2f6"
        />
      ) : (
        <directionalLight
          position={[-0.6, 2.8, 3.2]}
          intensity={0.16}
          color="#fffaf5"
        />
      )}
    </>
  );
}

/** Closed landing book only — reading uses OpenBook. */
export function BookScene({ copy, onOpen, zoom = 1 }: BookSceneProps) {
  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <div
      className="closed-book-canvas"
      role="button"
      tabIndex={0}
      aria-label={copy.bookAria}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        style={{ background: "transparent" }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 0.04, 7.35], fov: 30, near: 0.1, far: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <DraggableBook copy={copy} onOpen={handleOpen} zoom={zoom} />
          <BookContactShadow zoom={zoom} />
        </Suspense>
      </Canvas>
    </div>
  );
}
