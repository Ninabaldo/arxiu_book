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
  BACK_COVER_URL,
  COVER_PHOTO_URL,
  LINEN_URL,
  createBackCoverTexture,
  createPageEdgeTexture,
  createPaperFaceTexture,
  createPhotoFrontCoverTexture,
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
  const backPhoto = useTexture(BACK_COVER_URL);
  const [frontMap, setFrontMap] = useState<THREE.CanvasTexture | null>(null);
  const [backMap, setBackMap] = useState<THREE.CanvasTexture | null>(null);

  useLayoutEffect(() => {
    linen.colorSpace = THREE.SRGBColorSpace;
    linen.wrapS = THREE.RepeatWrapping;
    linen.wrapT = THREE.RepeatWrapping;
    linen.anisotropy = 8;
    linen.repeat.set(4.2, 5.6);
    linen.needsUpdate = true;
  }, [linen]);

  useLayoutEffect(() => {
    backPhoto.colorSpace = THREE.SRGBColorSpace;
    backPhoto.anisotropy = 12;
    backPhoto.wrapS = THREE.ClampToEdgeWrapping;
    backPhoto.wrapT = THREE.ClampToEdgeWrapping;
    backPhoto.needsUpdate = true;
  }, [backPhoto]);

  useFrame(() => {
    if (!hingeRef.current || !coverOpenRef) return;
    const t = coverOpenRef.current;
    hingeRef.current.rotation.y = -t * Math.PI * 0.92;
  });

  const pageMaps = useMemo(() => {
    const pageSide = createPageEdgeTexture("side");
    const pageEdge = createPageEdgeTexture("edge");
    const paperFace = createPaperFaceTexture();
    return { pageSide, pageEdge, paperFace };
  }, []);

  useEffect(() => {
    let alive = true;
    let front: THREE.CanvasTexture | null = null;
    let back: THREE.CanvasTexture | null = null;

    createPhotoFrontCoverTexture(
      {
        title: copy.coverTitle,
        subtitle: copy.coverSubtitle,
        dedication: copy.coverDedication,
        year: copy.coverYear,
      },
      COVER_PHOTO_URL,
    ).then((tex) => {
      if (!alive) {
        tex.dispose();
        return;
      }
      front?.dispose();
      front = tex;
      setFrontMap(tex);
    });

    createBackCoverTexture({
      paragraphs: copy.backCoverParagraphs,
    }).then((tex) => {
      if (!alive) {
        tex.dispose();
        return;
      }
      back?.dispose();
      back = tex;
      setBackMap(tex);
    });

    return () => {
      alive = false;
      setFrontMap(null);
      setBackMap(null);
      front?.dispose();
      back?.dispose();
    };
  }, [
    copy.coverTitle,
    copy.coverDedication,
    copy.coverSubtitle,
    copy.coverYear,
    copy.backCoverParagraphs,
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

  /** Spine board — cloth only, no title/author on the lateral edge */
  const spineBoardW = depth * 0.98;
  const spineBoardH = BOOK.height * 0.995;

  const clothMat = {
    map: linen,
    bumpMap: linen,
    bumpScale: 0.065,
    color: "#ffffff",
    roughness: 0.9,
    metalness: 0,
  } as const;

  const coverArtW = BOOK.width - 0.01;
  const coverArtH = BOOK.height - 0.01;

  return (
    <group name="physical-book">
      {/* Back cover — written blurb on oatmeal linen */}
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

        {backMap ? (
          <mesh
            position={[0, 0, -BOOK.coverThickness / 2 - 0.0008]}
            rotation={[0, Math.PI, 0]}
            castShadow={false}
            receiveShadow
          >
            <planeGeometry args={[coverArtW, coverArtH]} />
            <meshStandardMaterial
              map={backMap}
              color="#ffffff"
              roughness={0.92}
              metalness={0}
              toneMapped={false}
            />
          </mesh>
        ) : null}
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

          <mesh
            position={[0, 0, BOOK.coverThickness / 2 + 0.0008]}
            castShadow={false}
            receiveShadow
          >
            <planeGeometry args={[coverArtW, coverArtH]} />
            <meshStandardMaterial
              map={frontMap ?? backPhoto}
              color="#ffffff"
              roughness={0.92}
              metalness={0}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
