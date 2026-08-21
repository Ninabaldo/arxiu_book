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
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { CoverCopy } from "@/i18n/cover";
import { BOOK, bookTotalDepth } from "./dimensions";
import {
  LINEN_URL,
  createFrontCoverMaps,
  createPageEdgeTexture,
  createPaperFaceTexture,
  createSpineTexture,
  type CoverMaps,
} from "./textures";

interface PhysicalBookProps {
  copy: CoverCopy;
  /** 0 = closed, 1 = fully open — read each frame from parent */
  coverOpenRef?: MutableRefObject<number>;
}

/**
 * Slim hardcover construction:
 * back cover + page block + spine + front cover + artwork planes.
 * Reading uses OpenBook — not Html here.
 */
export function PhysicalBook({ copy, coverOpenRef }: PhysicalBookProps) {
  const hingeRef = useRef<THREE.Group>(null);

  const linen = useTexture(LINEN_URL);
  useLayoutEffect(() => {
    linen.colorSpace = THREE.SRGBColorSpace;
    linen.wrapS = THREE.RepeatWrapping;
    linen.wrapT = THREE.RepeatWrapping;
    linen.anisotropy = 8;
    linen.repeat.set(4.2, 5.6);
    linen.needsUpdate = true;
  }, [linen]);

  useFrame(() => {
    if (!hingeRef.current || !coverOpenRef) return;
    const t = coverOpenRef.current;
    hingeRef.current.rotation.y = -t * Math.PI * 0.92;
  });

  const [frontMaps, setFrontMaps] = useState<CoverMaps | null>(null);
  const [spineMap, setSpineMap] = useState<THREE.CanvasTexture | null>(null);
  const coverNormalScale = useMemo(() => new THREE.Vector2(1.15, 1.15), []);

  const pageMaps = useMemo(() => {
    const pageSide = createPageEdgeTexture("side");
    const pageEdge = createPageEdgeTexture("edge");
    const paperFace = createPaperFaceTexture();
    return { pageSide, pageEdge, paperFace };
  }, []);

  useEffect(() => {
    let alive = true;
    let front: CoverMaps | null = null;
    let spine: THREE.CanvasTexture | null = null;

    createFrontCoverMaps({
      title: copy.coverTitle,
      subtitle: copy.coverSubtitle,
      dedication: copy.coverDedication,
      year: copy.coverYear,
    })
      .then((maps) => {
        if (!alive) {
          maps.map.dispose();
          maps.normalMap.dispose();
          return;
        }
        front?.map.dispose();
        front?.normalMap.dispose();
        front = maps;
        setFrontMaps(maps);
      })
      .catch(() => {});

    createSpineTexture({
      title: copy.coverTitle,
      subtitle: copy.coverSubtitle,
      author: copy.spineAuthor,
    }).then((tex) => {
      if (!alive) {
        tex.dispose();
        return;
      }
      spine?.dispose();
      spine = tex;
      setSpineMap(tex);
    });

    return () => {
      alive = false;
      setFrontMaps(null);
      setSpineMap(null);
      front?.map.dispose();
      front?.normalMap.dispose();
      spine?.dispose();
    };
  }, [
    copy.coverTitle,
    copy.coverSubtitle,
    copy.coverDedication,
    copy.coverYear,
    copy.spineAuthor,
  ]);

  useLayoutEffect(
    () => () => {
      Object.values(pageMaps).forEach((t) => t.dispose());
    },
    [pageMaps],
  );

  const depth = bookTotalDepth();
  const pageW = BOOK.width - BOOK.pageInsetX - BOOK.spineInset;
  const pageH = BOOK.height - BOOK.pageInsetY * 2;
  const pageX = (BOOK.spineInset - BOOK.pageInsetX) / 2;

  const paper = { roughness: 0.98, metalness: 0 } as const;

  const pageMaterials = useMemo(() => {
    const { pageSide, pageEdge, paperFace } = pageMaps;
    return [
      new THREE.MeshStandardMaterial({ map: pageSide, ...paper, color: "#f4efe6" }),
      new THREE.MeshStandardMaterial({ color: "#ebe4d8", ...paper }),
      new THREE.MeshStandardMaterial({ map: pageEdge, ...paper, color: "#f4efe6" }),
      new THREE.MeshStandardMaterial({ map: pageEdge, ...paper, color: "#f0ebe2" }),
      new THREE.MeshStandardMaterial({ map: paperFace, ...paper, color: "#f7f2ea" }),
      new THREE.MeshStandardMaterial({ map: paperFace, ...paper, color: "#f7f2ea" }),
    ];
  }, [pageMaps]);

  useLayoutEffect(
    () => () => {
      pageMaterials.forEach((m) => m.dispose());
    },
    [pageMaterials],
  );

  const sheets = useMemo(() => {
    const count = 18;
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      return {
        z: -BOOK.pageDepth / 2 + 0.004 + t * (BOOK.pageDepth - 0.008),
        xJitter: ((i * 17) % 5) * 0.00035,
        yJitter: ((i * 13) % 5) * 0.00025 - 0.0005,
        hScale: 0.992 + ((i * 7) % 5) * 0.0015,
      };
    });
  }, []);

  /** Spine face matches the board so text sits on the physical spine, not a floating card */
  const spineBoardW = depth * 0.98;
  const spineBoardH = BOOK.height * 0.995;
  const spineFaceW = spineBoardW * 0.98;
  const spineFaceH = spineBoardH * 0.985;

  const clothMat = {
    map: linen,
    bumpMap: linen,
    bumpScale: 0.065,
    color: "#ffffff",
    roughness: 0.9,
    metalness: 0,
  } as const;

  return (
    <group name="physical-book">
      {/* Back cover — same linen material as the front boards */}
      <group
        name="back-cover"
        position={[0, 0, -depth / 2 + BOOK.coverThickness / 2]}
      >
        <RoundedBox
          args={[BOOK.width, BOOK.height, BOOK.coverThickness]}
          radius={BOOK.cornerRadius}
          smoothness={3}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial {...clothMat} />
        </RoundedBox>
      </group>

      <group name="page-block" position={[pageX, 0, 0]}>
        <mesh castShadow receiveShadow material={pageMaterials}>
          <boxGeometry args={[pageW, pageH, BOOK.pageDepth]} />
        </mesh>
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

      <group
        name="spine"
        position={[-BOOK.width / 2 - 0.001, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <RoundedBox
          args={[spineBoardW, spineBoardH, BOOK.coverThickness]}
          radius={0.006}
          smoothness={3}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial {...clothMat} />
        </RoundedBox>

        {spineMap ? (
          <mesh
            position={[0, 0, BOOK.coverThickness / 2 + 0.00035]}
            renderOrder={2}
          >
            <planeGeometry args={[spineFaceW, spineFaceH]} />
            <meshStandardMaterial
              map={spineMap}
              color="#ffffff"
              roughness={0.9}
              metalness={0}
              bumpMap={linen}
              bumpScale={0.03}
              polygonOffset
              polygonOffsetFactor={-1}
              polygonOffsetUnits={-1}
              depthWrite
            />
          </mesh>
        ) : null}
      </group>

      <group
        ref={hingeRef}
        name="front-cover-hinge"
        position={[
          -BOOK.width / 2,
          0,
          depth / 2 - BOOK.coverThickness / 2,
        ]}
      >
        <group name="front-cover" position={[BOOK.width / 2, 0, 0]}>
          <RoundedBox
            args={[BOOK.width, BOOK.height, BOOK.coverThickness]}
            radius={BOOK.cornerRadius}
            smoothness={3}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial {...clothMat} />
          </RoundedBox>

          {frontMaps ? (
            <mesh
              position={[0, 0, BOOK.coverThickness / 2 + 0.0008]}
              castShadow={false}
              receiveShadow
            >
              <planeGeometry args={[BOOK.width - 0.01, BOOK.height - 0.01]} />
              <meshStandardMaterial
                map={frontMaps.map}
                normalMap={frontMaps.normalMap}
                normalScale={coverNormalScale}
                color="#ffffff"
                roughness={0.93}
                metalness={0}
                bumpMap={linen}
                bumpScale={0.028}
              />
            </mesh>
          ) : null}
        </group>
      </group>
    </group>
  );
}
