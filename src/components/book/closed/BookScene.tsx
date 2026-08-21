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
import { ZOOM_MAX, ZOOM_MIN } from "@/hooks/useBookZoom";
import { CLOSED_FORMAT } from "./config";
import { PhysicalBook } from "./hardcover/PhysicalBook";
import { BOOK, bookTotalDepth } from "./hardcover/dimensions";
import { PhysicalBinder } from "./binder/PhysicalBinder";
import { BINDER, binderTotalDepth } from "./binder/dimensions";

interface BookSceneProps {
  copy: CoverCopy;
  onOpen: () => void;
  zoom?: number;
  /** When set, two-finger pinch on the cover adjusts zoom (mobile). */
  onZoomChange?: (zoom: number) => void;
}

const CLICK_PX = 8;
/** Face-on rest pose — book sits straight until the user drags. */
const REST_X = 0;
const REST_Y = 0;
/** Slow, intentional orbit */
const PITCH_SENS = 0.0016;
const YAW_SENS = 0.0028;
const PITCH_MAX = 1.05;
const VEL_GAIN = 4.5;
const VEL_DECAY = 0.78;
const VEL_MIN = 0.00015;
const ROT_FOLLOW = 9;

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
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const drag = useRef<{
    active: boolean;
    pointerId: number;
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
      THREE.MathUtils.damp(g.scale.x, zoomRef.current, 6, dt),
    );
    g.position.set(0, 0, 0);

    if (!drag.current?.active) {
      vel.current.x *= VEL_DECAY;
      vel.current.y *= VEL_DECAY;
      const coasting =
        Math.abs(vel.current.x) > VEL_MIN || Math.abs(vel.current.y) > VEL_MIN;
      if (coasting) {
        rot.current.x = THREE.MathUtils.clamp(
          rot.current.x + vel.current.x,
          -PITCH_MAX,
          PITCH_MAX,
        );
        rot.current.y += vel.current.y;
      } else {
        vel.current.x = 0;
        vel.current.y = 0;
      }
    }

    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rot.current.x, ROT_FOLLOW, dt);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, rot.current.y, ROT_FOLLOW, dt);
  });

  useEffect(() => {
    const el = gl.domElement;

    const onMove = (e: PointerEvent) => {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      /* Pinch / multi-touch — do not spin the book */
      if (pointers.current.size > 1) {
        if (drag.current?.active) {
          drag.current = null;
          vel.current = { x: 0, y: 0 };
        }
        return;
      }
      if (!drag.current?.active || drag.current.pointerId !== e.pointerId) return;

      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      drag.current.moved = Math.max(drag.current.moved, Math.hypot(dx, dy));

      const nextX = THREE.MathUtils.clamp(
        drag.current.ox + dy * PITCH_SENS,
        -PITCH_MAX,
        PITCH_MAX,
      );
      const nextY = drag.current.oy + dx * YAW_SENS;

      const now = performance.now();
      const dlt = Math.max(24, now - drag.current.lt);
      vel.current = {
        x: THREE.MathUtils.clamp(((nextX - rot.current.x) / dlt) * VEL_GAIN, -0.04, 0.04),
        y: THREE.MathUtils.clamp(((nextY - rot.current.y) / dlt) * VEL_GAIN, -0.05, 0.05),
      };
      drag.current.lt = now;
      rot.current.x = nextX;
      rot.current.y = nextY;
    };

    const onUp = (e: PointerEvent) => {
      pointers.current.delete(e.pointerId);
      if (!drag.current?.active || drag.current.pointerId !== e.pointerId) return;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const wasClick = drag.current.moved < CLICK_PX;
      drag.current = null;
      if (wasClick && pointers.current.size === 0) onOpenRef.current();
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
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size > 1) {
      drag.current = null;
      vel.current = { x: 0, y: 0 };
      return;
    }
    gl.domElement.setPointerCapture(e.pointerId);
    drag.current = {
      active: true,
      pointerId: e.pointerId,
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
export function BookScene({
  copy,
  onOpen,
  zoom = 1,
  onZoomChange,
}: BookSceneProps) {
  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);
  const shellRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const onZoomRef = useRef(onZoomChange);
  onZoomRef.current = onZoomChange;
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);

  useEffect(() => {
    const el = shellRef.current;
    if (!el || !onZoomChange) return;

    const clamp = (v: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, v));

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) {
        pinchRef.current = null;
        return;
      }
      const a = e.touches[0];
      const b = e.touches[1];
      pinchRef.current = {
        dist: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
        zoom: zoomRef.current,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !pinchRef.current || !onZoomRef.current) {
        return;
      }
      e.preventDefault();
      const a = e.touches[0];
      const b = e.touches[1];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const ratio = dist / Math.max(1, pinchRef.current.dist);
      onZoomRef.current(clamp(pinchRef.current.zoom * ratio));
    };

    const onTouchEnd = () => {
      if (!pinchRef.current) return;
      /* Keep baseline so continuous pinch feels stable after finger lift */
      pinchRef.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [onZoomChange]);

  return (
    <div
      ref={shellRef}
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
        dpr={[1, 2]}
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
