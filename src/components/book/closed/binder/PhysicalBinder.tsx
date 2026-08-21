"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { CoverCopy } from "@/i18n/cover";
import { BINDER, binderTotalDepth } from "./dimensions";
import {
  createBackCoverTexture,
  createFrontCoverTexture,
  createPageEdgeTexture,
  createPaperFaceTexture,
  createSpineTexture,
  createTitlePageTexture,
} from "./textures";

interface PhysicalBinderProps {
  copy: CoverCopy;
  /** 0 = closed, 1 = fully open — read each frame from parent */
  coverOpenRef?: MutableRefObject<number>;
}

const BURGUNDY = "#5c1f28";
const METAL = "#c5ccd4";

/**
 * Informal ring binder / arxivador:
 * burgundy boards + vertical silver 4-ring mechanism + ivory punched pages.
 */
export function PhysicalBinder({ copy, coverOpenRef }: PhysicalBinderProps) {
  const hingeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!hingeRef.current || !coverOpenRef) return;
    const t = coverOpenRef.current;
    hingeRef.current.rotation.y = -t * Math.PI * 0.92;
  });

  const [frontMap, setFrontMap] = useState<THREE.CanvasTexture | null>(null);
  const [spineMap, setSpineMap] = useState<THREE.CanvasTexture | null>(null);
  const [backMap, setBackMap] = useState<THREE.CanvasTexture | null>(null);
  const [titlePageMap, setTitlePageMap] = useState<THREE.CanvasTexture | null>(
    null,
  );

  const pageMaps = useMemo(() => {
    const pageSide = createPageEdgeTexture("side");
    const pageEdge = createPageEdgeTexture("edge");
    const paperFace = createPaperFaceTexture();
    return { pageSide, pageEdge, paperFace };
  }, []);

  useEffect(() => {
    let alive = true;
    let front: THREE.CanvasTexture | null = null;
    let spine: THREE.CanvasTexture | null = null;
    let back: THREE.CanvasTexture | null = null;
    let titlePage: THREE.CanvasTexture | null = null;

    const apply = (
      created: THREE.CanvasTexture,
      set: (t: THREE.CanvasTexture) => void,
      slot: "front" | "spine" | "back" | "title",
    ) => {
      if (!alive) {
        created.dispose();
        return;
      }
      if (slot === "front") {
        front?.dispose();
        front = created;
      } else if (slot === "spine") {
        spine?.dispose();
        spine = created;
      } else if (slot === "back") {
        back?.dispose();
        back = created;
      } else {
        titlePage?.dispose();
        titlePage = created;
      }
      set(created);
    };

    const coverCopy = {
      title: copy.coverTitle,
      subtitle: copy.coverSubtitle,
      dedication: copy.coverDedication,
    };

    createFrontCoverTexture(coverCopy)
      .then((tex) => apply(tex, setFrontMap, "front"))
      .catch(() => {});

    createSpineTexture({
      title: copy.coverTitle,
      subtitle: copy.coverSubtitle,
      author: copy.spineAuthor,
    })
      .then((tex) => apply(tex, setSpineMap, "spine"))
      .catch(() => {});

    createBackCoverTexture()
      .then((tex) => apply(tex, setBackMap, "back"))
      .catch(() => {});

    createTitlePageTexture(coverCopy)
      .then((tex) => apply(tex, setTitlePageMap, "title"))
      .catch(() => {});

    return () => {
      alive = false;
      setFrontMap(null);
      setSpineMap(null);
      setBackMap(null);
      setTitlePageMap(null);
      front?.dispose();
      spine?.dispose();
      back?.dispose();
      titlePage?.dispose();
    };
  }, [
    copy.coverTitle,
    copy.coverSubtitle,
    copy.coverDedication,
    copy.spineAuthor,
  ]);

  useLayoutEffect(
    () => () => {
      Object.values(pageMaps).forEach((t) => t.dispose());
    },
    [pageMaps],
  );

  const depth = binderTotalDepth();
  const pageW = BINDER.width - BINDER.pageInsetX - BINDER.ringInset;
  const pageH = BINDER.height - BINDER.pageInsetY * 2;
  const pageX = (BINDER.ringInset - BINDER.pageInsetX) / 2;

  const paper = { roughness: 0.98, metalness: 0 } as const;

  const pageMaterials = useMemo(() => {
    const { pageSide, pageEdge, paperFace } = pageMaps;
    return [
      new THREE.MeshStandardMaterial({
        map: pageSide,
        ...paper,
        color: "#f4efe6",
      }),
      new THREE.MeshStandardMaterial({ color: "#ebe4d8", ...paper }),
      new THREE.MeshStandardMaterial({
        map: pageEdge,
        ...paper,
        color: "#f4efe6",
      }),
      new THREE.MeshStandardMaterial({
        map: pageEdge,
        ...paper,
        color: "#f0ebe2",
      }),
      new THREE.MeshStandardMaterial({
        map: paperFace,
        ...paper,
        color: "#f7f2ea",
      }),
      new THREE.MeshStandardMaterial({
        map: paperFace,
        ...paper,
        color: "#f7f2ea",
      }),
    ];
  }, [pageMaps]);

  useLayoutEffect(
    () => () => {
      pageMaterials.forEach((m) => m.dispose());
    },
    [pageMaterials],
  );

  const sheets = useMemo(() => {
    const count = 16;
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      return {
        z: -BINDER.pageDepth / 2 + 0.004 + t * (BINDER.pageDepth - 0.008),
        xJitter: ((i * 17) % 5) * 0.00035,
        yJitter: ((i * 13) % 5) * 0.00025 - 0.0005,
        hScale: 0.992 + ((i * 7) % 5) * 0.0015,
      };
    });
  }, []);

  const ringYs = useMemo(() => {
    const margin = BINDER.height * 0.14;
    const span = BINDER.height - margin * 2;
    const n = BINDER.ringCount;
    return Array.from({ length: n }, (_, i) => {
      const t = n <= 1 ? 0.5 : i / (n - 1);
      return -BINDER.height / 2 + margin + t * span;
    });
  }, []);

  const boardMat = {
    color: BURGUNDY,
    roughness: 0.88,
    metalness: 0.02,
  } as const;

  const metalMat = {
    color: METAL,
    roughness: 0.22,
    metalness: 0.92,
  } as const;

  const spineFaceW = depth * 0.88;
  const spineFaceH = BINDER.height * 0.92;
  const railX = -BINDER.width / 2 + BINDER.ringInset * 0.42;
  const ringCenterX = railX + BINDER.ringRadius * 0.15;

  return (
    <group name="physical-binder">
      {/* Back board */}
      <group
        name="back-cover"
        position={[0, 0, -depth / 2 + BINDER.coverThickness / 2]}
      >
        <RoundedBox
          args={[BINDER.width, BINDER.height, BINDER.coverThickness]}
          radius={BINDER.cornerRadius}
          smoothness={3}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={backMap ?? undefined}
            color={backMap ? "#ffffff" : BURGUNDY}
            roughness={0.88}
            metalness={0.02}
          />
        </RoundedBox>
      </group>

      {/* Ivory page block with punched left edge */}
      <group name="page-block" position={[pageX, 0, 0]}>
        <mesh castShadow receiveShadow material={pageMaterials}>
          <boxGeometry args={[pageW, pageH, BINDER.pageDepth]} />
        </mesh>

        {titlePageMap ? (
          <mesh
            position={[0, 0, BINDER.pageDepth / 2 + 0.0006]}
            castShadow={false}
            receiveShadow
          >
            <planeGeometry args={[pageW - 0.004, pageH - 0.004]} />
            <meshStandardMaterial
              map={titlePageMap}
              color="#ffffff"
              roughness={0.98}
              metalness={0}
              toneMapped={false}
            />
          </mesh>
        ) : null}

        {sheets.map((s, i) => (
          <mesh
            key={i}
            position={[pageW / 2 - 0.001 + s.xJitter, s.yJitter, s.z]}
          >
            <boxGeometry args={[0.0018, pageH * s.hScale, 0.0011]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#efe8dc" : "#f5f0e7"}
              roughness={0.99}
              metalness={0}
            />
          </mesh>
        ))}
      </group>

      {/* Silver 4-ring mechanism (vertical rail + rings through pages) */}
      <group name="ring-mechanism" position={[0, 0, 0]}>
        <mesh
          position={[railX, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry
            args={[BINDER.railWidth, BINDER.height * 0.9, BINDER.railDepth]}
          />
          <meshStandardMaterial {...metalMat} />
        </mesh>

        {/* Rivets between rings on the rail face */}
        {ringYs.slice(0, -1).map((y, i) => {
          const next = ringYs[i + 1]!;
          const mid = (y + next) / 2;
          return (
            <mesh
              key={`rivet-${i}`}
              position={[railX, mid, BINDER.railDepth / 2 + 0.002]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.006, 0.006, 0.004, 16]} />
              <meshStandardMaterial {...metalMat} roughness={0.18} />
            </mesh>
          );
        })}

        {/* Rings in XZ plane — pass through page block depth */}
        {ringYs.map((y, i) => (
          <group key={`ring-${i}`} position={[ringCenterX, y, 0]}>
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry
                args={[
                  BINDER.ringRadius,
                  BINDER.ringTube,
                  12,
                  48,
                  Math.PI * 1.88,
                ]}
              />
              <meshStandardMaterial {...metalMat} />
            </mesh>
            {/* Seam caps at the openable joint (toward page holes) */}
            <mesh
              position={[
                Math.cos(0.12) * BINDER.ringRadius,
                0,
                Math.sin(0.12) * BINDER.ringRadius,
              ]}
            >
              <sphereGeometry args={[BINDER.ringTube * 1.05, 10, 10]} />
              <meshStandardMaterial {...metalMat} />
            </mesh>
            <mesh
              position={[
                Math.cos(-0.12) * BINDER.ringRadius,
                0,
                Math.sin(-0.12) * BINDER.ringRadius,
              ]}
            >
              <sphereGeometry args={[BINDER.ringTube * 1.05, 10, 10]} />
              <meshStandardMaterial {...metalMat} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Narrow spine board between covers */}
      <group
        name="spine"
        position={[-BINDER.width / 2 - 0.001, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <RoundedBox
          args={[depth * 0.98, BINDER.height * 0.995, BINDER.coverThickness * 0.9]}
          radius={0.006}
          smoothness={3}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial {...boardMat} />
        </RoundedBox>

        {spineMap ? (
          <mesh
            position={[0, 0, BINDER.coverThickness / 2 + 0.002]}
            renderOrder={3}
          >
            <planeGeometry args={[spineFaceW, spineFaceH]} />
            <meshStandardMaterial
              map={spineMap}
              color="#ffffff"
              roughness={0.88}
              metalness={0.02}
              toneMapped={false}
              side={THREE.DoubleSide}
              depthWrite
            />
          </mesh>
        ) : null}
      </group>

      {/* Front cover hinge (opens on click) */}
      <group
        ref={hingeRef}
        name="front-cover-hinge"
        position={[
          -BINDER.width / 2,
          0,
          depth / 2 - BINDER.coverThickness / 2,
        ]}
      >
        <group name="front-cover" position={[BINDER.width / 2, 0, 0]}>
          <RoundedBox
            args={[BINDER.width, BINDER.height, BINDER.coverThickness]}
            radius={BINDER.cornerRadius}
            smoothness={3}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial {...boardMat} />
          </RoundedBox>

          {frontMap ? (
            <mesh
              position={[0, 0, BINDER.coverThickness / 2 + 0.0008]}
              castShadow={false}
              receiveShadow
            >
              <planeGeometry
                args={[BINDER.width - 0.012, BINDER.height - 0.012]}
              />
              <meshStandardMaterial
                map={frontMap}
                color="#ffffff"
                roughness={0.88}
                metalness={0.02}
                toneMapped={false}
              />
            </mesh>
          ) : null}
        </group>
      </group>
    </group>
  );
}
