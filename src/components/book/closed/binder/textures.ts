import * as THREE from "three";

/** Deep burgundy / maroon board (reference binder) */
const BOARD = "#5c1f28";
const BOARD_MID = "#6a2630";
const BOARD_DEEP = "#3d141a";
const BOARD_LIGHT = "#7a323c";
/** Warm ivory pages */
const PAPER = "#f4efe6";
const PAPER_LINE = "#ebe4d8";
/** Cover ink — soft ivory on burgundy */
const INK_IVORY = "#f2ebe0";
const INK_SOFT = "#e8d9c8";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const t = window.setTimeout(() => resolve(null), ms);
    promise
      .then((v) => {
        window.clearTimeout(t);
        resolve(v);
      })
      .catch(() => {
        window.clearTimeout(t);
        resolve(null);
      });
  });
}

async function fontsReady(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts?.ready) return;
  await withTimeout(document.fonts.ready.then(() => true), 1200);
  await new Promise<void>((r) => requestAnimationFrame(() => r()));
}

function cssFont(varName: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const raw = getComputedStyle(document.body)
    .getPropertyValue(varName)
    .trim();
  return raw.length > 0 ? raw : fallback;
}

function handStack() {
  return `${cssFont("--font-handwritten", "Caveat")}, Caveat, cursive`;
}

function sansStack() {
  return `${cssFont("--font-instrument-sans", "Instrument Sans")}, "Instrument Sans", Helvetica, sans-serif`;
}

function boardNoise(size: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = Math.random();
    const fleck = n > 0.992 ? 22 : n > 0.94 ? -14 : 0;
    const v = 90 + Math.random() * 40 + fleck;
    img.data[i] = Math.min(255, v + 18);
    img.data[i + 1] = Math.min(255, v * 0.45);
    img.data[i + 2] = Math.min(255, v * 0.52);
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

/** Matte paperboard grain — informal, not linen */
function paintBoard(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  const g = ctx.createLinearGradient(0, 0, w * 0.15, h);
  g.addColorStop(0, BOARD_MID);
  g.addColorStop(0.4, BOARD);
  g.addColorStop(1, BOARD_DEEP);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const noise = boardNoise(256);
  ctx.globalAlpha = 0.35;
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(noise, 0, 0, w, h);
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = 0.22;
  ctx.drawImage(noise, 0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;

  // Fine horizontal fiber suggestion
  ctx.globalAlpha = 0.04;
  for (let y = 0; y < h; y += 3) {
    ctx.fillStyle = y % 6 === 0 ? BOARD_LIGHT : BOARD_DEEP;
    ctx.fillRect(0, y, w, 1);
  }
  ctx.globalAlpha = 1;

  const vignette = ctx.createRadialGradient(
    w * 0.5,
    h * 0.45,
    w * 0.15,
    w * 0.5,
    h * 0.5,
    w * 0.85,
  );
  vignette.addColorStop(0, "rgba(120,50,58,0.08)");
  vignette.addColorStop(0.55, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(20,8,10,0.22)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export type CoverTextureCopy = {
  title: string;
  subtitle: string;
  dedication: string;
};

/**
 * Front cover: burgundy board + ivory title / subtitle / dedication.
 */
export async function createFrontCoverTexture(
  copy: CoverTextureCopy,
): Promise<THREE.CanvasTexture> {
  await fontsReady();

  const w = 1024;
  const h = 1408;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  paintBoard(ctx, w, h);

  // Soft spine shadow on the left (ring side)
  const hinge = ctx.createLinearGradient(0, 0, w * 0.12, 0);
  hinge.addColorStop(0, "rgba(20,8,10,0.28)");
  hinge.addColorStop(0.5, "rgba(20,8,10,0.08)");
  hinge.addColorStop(1, "rgba(20,8,10,0)");
  ctx.fillStyle = hinge;
  ctx.fillRect(0, 0, w * 0.14, h);

  const hand = handStack();
  const sans = sansStack();
  const cx = w / 2;

  const titleSize = Math.round(h * 0.095);
  const subSize = Math.round(h * 0.028);
  const ruleGap = titleSize * 0.28;
  const subGap = subSize * 1.55;
  const clusterHeight = titleSize + ruleGap + 2 + subGap;
  const clusterTop = h * 0.42 - clusterHeight * 0.35;

  ctx.fillStyle = INK_IVORY;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.font = `400 ${titleSize}px ${hand}`;
  const title = copy.title.toUpperCase();
  ctx.fillText(title, cx, clusterTop);

  const titleWidth = ctx.measureText(title).width;
  const ruleW = titleWidth * 0.65;
  const ruleY = clusterTop + ruleGap;
  ctx.fillStyle = INK_SOFT;
  ctx.globalAlpha = 0.55;
  ctx.fillRect(cx - ruleW / 2, ruleY, ruleW, Math.max(1.5, h * 0.0012));
  ctx.globalAlpha = 1;

  ctx.fillStyle = INK_IVORY;
  ctx.font = `400 ${subSize}px ${hand}`;
  const subtitle = copy.subtitle.replace(/\n/g, " ").toLowerCase();
  ctx.fillText(subtitle, cx, ruleY + subGap);

  const dedSize = Math.round(h * 0.016);
  ctx.font = `500 ${dedSize}px ${sans}`;
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = INK_SOFT;
  const dedication = copy.dedication.toUpperCase();
  const spaced = dedication.split("").join("\u2009");
  ctx.fillText(spaced, cx, h * 0.86);
  ctx.globalAlpha = 1;

  return toTexture(canvas);
}

export async function createBackCoverTexture(): Promise<THREE.CanvasTexture> {
  const w = 1024;
  const h = 1408;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  paintBoard(ctx, w, h);

  const hinge = ctx.createLinearGradient(w, 0, w * 0.88, 0);
  hinge.addColorStop(0, "rgba(20,8,10,0.2)");
  hinge.addColorStop(1, "rgba(20,8,10,0)");
  ctx.fillStyle = hinge;
  ctx.fillRect(w * 0.86, 0, w * 0.14, h);

  return toTexture(canvas);
}

export type SpineTextureCopy = {
  title: string;
  subtitle: string;
  author: string;
};

/** Narrow spine face between boards (short titles along binder edge). */
export async function createSpineTexture(
  copy: SpineTextureCopy,
): Promise<THREE.CanvasTexture> {
  await fontsReady();

  const w = 640;
  const h = 1800;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  paintBoard(ctx, w, h);

  const hand = handStack();
  const sans = sansStack();
  const title = copy.title.toUpperCase();
  const subtitle = copy.subtitle.replace(/\n/g, " ").toLowerCase();
  const author = copy.author;

  const drawAlongSpine = (
    text: string,
    yCenter: number,
    font: string,
    alpha: number,
  ) => {
    ctx.save();
    ctx.translate(w / 2, yCenter);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = INK_IVORY;
    ctx.globalAlpha = alpha;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 0, 0);
    ctx.restore();
  };

  drawAlongSpine(title, h * 0.2, `400 44px ${hand}`, 0.92);
  drawAlongSpine(subtitle, h * 0.52, `400 28px ${hand}`, 0.88);
  drawAlongSpine(author, h * 0.84, `500 26px ${sans}`, 0.85);

  return toTexture(canvas);
}

/**
 * First visible page face (ivory + title) — shown through slightly open pose
 * and as the paper face under the front cover when closed.
 */
export async function createTitlePageTexture(
  copy: CoverTextureCopy,
): Promise<THREE.CanvasTexture> {
  await fontsReady();

  const w = 1024;
  const h = 1408;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);

  const noise = boardNoise(256);
  ctx.globalAlpha = 0.08;
  ctx.drawImage(noise, 0, 0, w, h);
  ctx.globalAlpha = 1;

  // Punch holes along left (ring side)
  const holeX = w * 0.055;
  const holeR = w * 0.018;
  const holes = [0.18, 0.38, 0.58, 0.78];
  for (const yt of holes) {
    const y = h * yt;
    ctx.beginPath();
    ctx.arc(holeX, y, holeR, 0, Math.PI * 2);
    ctx.fillStyle = "#d8d0c4";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(holeX, y, holeR * 0.72, 0, Math.PI * 2);
    ctx.fillStyle = "#2a2220";
    ctx.fill();
  }

  const hand = handStack();
  const sans = sansStack();
  const cx = w * 0.54;
  const ink = "#6a2630";

  const titleSize = Math.round(h * 0.08);
  const subSize = Math.round(h * 0.026);
  const ruleGap = titleSize * 0.3;
  const subGap = subSize * 1.6;
  const clusterTop = h * 0.4;

  ctx.fillStyle = ink;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = `400 ${titleSize}px ${hand}`;
  const title = copy.title.toUpperCase();
  ctx.fillText(title, cx, clusterTop);

  const titleWidth = ctx.measureText(title).width;
  const ruleW = titleWidth * 0.6;
  const ruleY = clusterTop + ruleGap;
  ctx.globalAlpha = 0.45;
  ctx.fillRect(cx - ruleW / 2, ruleY, ruleW, Math.max(1.5, h * 0.0012));
  ctx.globalAlpha = 1;

  ctx.font = `400 ${subSize}px ${hand}`;
  ctx.fillText(copy.subtitle.replace(/\n/g, " ").toLowerCase(), cx, ruleY + subGap);

  const dedSize = Math.round(h * 0.015);
  ctx.font = `500 ${dedSize}px ${sans}`;
  ctx.globalAlpha = 0.8;
  ctx.fillText(
    copy.dedication.toUpperCase().split("").join("\u2009"),
    cx,
    h * 0.88,
  );
  ctx.globalAlpha = 1;

  return toTexture(canvas);
}

export function createPageEdgeTexture(
  orientation: "side" | "edge",
): THREE.CanvasTexture {
  const w = orientation === "side" ? 384 : 1024;
  const h = orientation === "side" ? 1408 : 384;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);

  const lines = orientation === "side" ? 110 : 85;
  for (let i = 0; i < lines; i++) {
    const t = i / lines;
    const base = orientation === "side" ? t * w : t * h;
    const wobble = Math.sin(i * 9.3) * 1.1 + Math.sin(i * 2.7) * 0.7;
    const thickness = 0.8 + (i % 7 === 0 ? 1.1 : 0) + (i % 3) * 0.15;
    const shade = 218 + ((i * 17) % 28);
    ctx.fillStyle = `rgb(${shade},${shade - 7},${shade - 16})`;

    if (orientation === "side") {
      const x = base + wobble;
      ctx.fillRect(x, 0, thickness, h);
    } else {
      const y = base + wobble;
      ctx.fillRect(0, y, w, thickness);
    }
  }

  if (orientation === "side") {
    const g = ctx.createLinearGradient(0, 0, w * 0.2, 0);
    g.addColorStop(0, "rgba(42,38,32,0.08)");
    g.addColorStop(1, "rgba(42,38,32,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w * 0.25, h);
  }

  return toTexture(canvas);
}

export function createPaperFaceTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, size, size);
  const noise = boardNoise(256);
  ctx.globalAlpha = 0.12;
  ctx.drawImage(noise, 0, 0, size, size);
  ctx.globalAlpha = 1;
  return toTexture(canvas);
}

export { BOARD, PAPER_LINE };
