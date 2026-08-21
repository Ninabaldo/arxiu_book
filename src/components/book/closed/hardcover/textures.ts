import * as THREE from "three";

/** Cover ink — same navy as favicon mark */
const INK_BLUE = "#143158";
/** Oatmeal / sandy beige from reference photo (~RGB 191,180,161) */
const CLOTH = "#c8baa4";
const CLOTH_MID = "#bfb19a";
const CLOTH_DEEP = "#a8947a";
const PAPER = "#faf7f1";
const PAPER_LINE = "#ebe4d8";

export const LINEN_URL = "/textures/linen-weave.png";

let linenImage: HTMLImageElement | null = null;
let linenPromise: Promise<HTMLImageElement | null> | null = null;

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

function loadLinenImage(): Promise<HTMLImageElement | null> {
  if (linenImage) return Promise.resolve(linenImage);
  if (linenPromise) return linenPromise;

  linenPromise = new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      linenImage = img;
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = LINEN_URL;
  });

  return linenPromise;
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

/** Fiber-scale noise for linen irregularity */
function linenNoise(size: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = Math.random();
    const fleck = n > 0.988 ? -28 : n > 0.93 ? -10 : 0;
    const v = 188 + Math.random() * 36 + fleck;
    img.data[i] = Math.min(255, v);
    img.data[i + 1] = Math.min(255, v - 8);
    img.data[i + 2] = Math.min(255, v - 22);
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

/** Visible procedural plain-weave — always available, never blocks */
function paintProceduralWeave(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  const g = ctx.createLinearGradient(0, 0, w * 0.1, h);
  g.addColorStop(0, CLOTH_MID);
  g.addColorStop(0.45, CLOTH);
  g.addColorStop(1, CLOTH_DEEP);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const cell = 96;
  const weave = document.createElement("canvas");
  weave.width = cell;
  weave.height = cell;
  const wctx = weave.getContext("2d")!;
  wctx.fillStyle = CLOTH;
  wctx.fillRect(0, 0, cell, cell);

  for (let i = 0; i < cell; i += 2) {
    wctx.fillStyle =
      i % 4 === 0 ? "rgba(255,250,240,0.42)" : "rgba(120,100,70,0.2)";
    wctx.fillRect(i, 0, 1, cell);
    wctx.fillStyle =
      i % 4 === 0 ? "rgba(255,248,236,0.36)" : "rgba(110,90,60,0.18)";
    wctx.fillRect(0, i, cell, 1);
  }

  for (let y = 0; y < cell; y += 4) {
    for (let x = 0; x < cell; x += 4) {
      const over = ((x + y) / 4) % 2 === 0;
      wctx.fillStyle = over
        ? "rgba(255,252,246,0.28)"
        : "rgba(130,108,78,0.16)";
      wctx.fillRect(x, y, 2, 2);
    }
  }

  const pattern = ctx.createPattern(weave, "repeat");
  if (pattern) {
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  const noise = linenNoise(256);
  ctx.globalAlpha = 0.28;
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(noise, 0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
}

/** Tile photo linen with drawImage (more reliable than createPattern transform) */
function paintPhotoLinen(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  linen: HTMLImageElement,
) {
  const tile = Math.max(180, Math.min(280, Math.round(Math.min(w, h) / 4.2)));
  for (let y = 0; y < h; y += tile) {
    for (let x = 0; x < w; x += tile) {
      ctx.drawImage(linen, x, y, tile, tile);
    }
  }
  // Slight warm unify toward reference oatmeal
  ctx.fillStyle = "rgba(191,180,161,0.12)";
  ctx.fillRect(0, 0, w, h);
}

/**
 * Oatmeal linen base. Procedural weave first (instant), photo linen if ready.
 */
async function clothBase(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
): Promise<void> {
  paintProceduralWeave(ctx, w, h);

  const linen = await withTimeout(loadLinenImage(), 2000);
  if (linen) {
    paintPhotoLinen(ctx, w, h, linen);
    const noise = linenNoise(256);
    ctx.globalAlpha = 0.12;
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(noise, 0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }

  const vignette = ctx.createRadialGradient(
    w * 0.5,
    h * 0.42,
    w * 0.18,
    w * 0.5,
    h * 0.48,
    w * 0.78,
  );
  vignette.addColorStop(0, "rgba(255,250,240,0.06)");
  vignette.addColorStop(0.55, "rgba(255,248,238,0)");
  vignette.addColorStop(1, "rgba(90,78,58,0.08)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}

function paintHinge(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const hinge = ctx.createLinearGradient(0, 0, w * 0.085, 0);
  hinge.addColorStop(0, "rgba(90,75,55,0.16)");
  hinge.addColorStop(0.35, "rgba(90,75,55,0.06)");
  hinge.addColorStop(1, "rgba(90,75,55,0)");
  ctx.fillStyle = hinge;
  ctx.fillRect(0, 0, w * 0.1, h);

  const hingeLight = ctx.createLinearGradient(w * 0.02, 0, w * 0.09, 0);
  hingeLight.addColorStop(0, "rgba(255,248,235,0)");
  hingeLight.addColorStop(0.5, "rgba(255,248,235,0.12)");
  hingeLight.addColorStop(1, "rgba(255,248,235,0)");
  ctx.fillStyle = hingeLight;
  ctx.fillRect(w * 0.02, 0, w * 0.08, h);
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
  /** Author name on cover (e.g. Nina Baldó) */
  dedication: string;
  year: string;
};

export type CoverMaps = {
  map: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
};

type CoverLayout = {
  hand: string;
  sans: string;
  cx: number;
  title: string;
  subtitle: string;
  author: string;
  year: string;
  titleSize: number;
  subSize: number;
  authorSize: number;
  yearSize: number;
  clusterTop: number;
  ruleGap: number;
  subGap: number;
  ruleW: number;
  ruleY: number;
  ruleH: number;
  authorY: number;
  yearY: number;
};

function coverLayout(copy: CoverTextureCopy, w: number, h: number): CoverLayout {
  const hand = handStack();
  const sans = sansStack();
  const cx = w / 2;
  const titleSize = Math.round(h * 0.095);
  const subSize = Math.round(h * 0.028);
  const ruleGap = titleSize * 0.28;
  const subGap = subSize * 1.55;
  const clusterHeight = titleSize + ruleGap + 2 + subGap;
  const clusterTop = h * 0.42 - clusterHeight * 0.35;
  const title = copy.title.toUpperCase();
  const subtitle = copy.subtitle.replace(/\n/g, " ").toLowerCase();
  const author = copy.dedication.trim();
  const year = copy.year.trim();

  const measure = document.createElement("canvas").getContext("2d")!;
  measure.font = `400 ${titleSize}px ${hand}`;
  const titleWidth = measure.measureText(title).width;
  const ruleW = titleWidth * 0.65;
  const ruleY = clusterTop + ruleGap;
  const ruleH = Math.max(1.5, h * 0.0012);

  return {
    hand,
    sans,
    cx,
    title,
    subtitle,
    author,
    year,
    titleSize,
    subSize,
    authorSize: Math.round(h * 0.018),
    yearSize: Math.round(h * 0.014),
    clusterTop,
    ruleGap,
    subGap,
    ruleW,
    ruleY,
    ruleH,
    authorY: h * 0.86,
    yearY: h * 0.905,
  };
}

function paintCoverGlyphs(
  ctx: CanvasRenderingContext2D,
  layout: CoverLayout,
  fill: string,
  alpha: number,
) {
  const {
    hand,
    sans,
    cx,
    title,
    subtitle,
    author,
    year,
    titleSize,
    subSize,
    authorSize,
    yearSize,
    clusterTop,
    ruleW,
    ruleY,
    ruleH,
    subGap,
    authorY,
    yearY,
  } = layout;

  ctx.save();
  ctx.fillStyle = fill;
  ctx.globalAlpha = alpha;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.font = `400 ${titleSize}px ${hand}`;
  ctx.fillText(title, cx, clusterTop);

  ctx.fillRect(cx - ruleW / 2, ruleY, ruleW, ruleH);

  ctx.font = `400 ${subSize}px ${hand}`;
  ctx.fillText(subtitle, cx, ruleY + subGap);

  // Author — elegant, no letter-spacing monogram / no dedication phrase
  ctx.font = `500 ${authorSize}px ${sans}`;
  ctx.globalAlpha = alpha * 0.92;
  ctx.fillText(author, cx, authorY);

  if (year) {
    ctx.font = `400 ${yearSize}px ${sans}`;
    ctx.globalAlpha = alpha * 0.72;
    ctx.fillText(year, cx, yearY);
  }
  ctx.restore();
}

/**
 * Height field for deboss: white = surface, darker = pressed in.
 */
function buildDebossHeight(
  w: number,
  h: number,
  layout: CoverLayout,
  linen: HTMLImageElement | null,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  if (linen) {
    const tile = Math.max(180, Math.min(280, Math.round(Math.min(w, h) / 4.2)));
    ctx.globalAlpha = 0.14;
    for (let y = 0; y < h; y += tile) {
      for (let x = 0; x < w; x += tile) {
        ctx.drawImage(linen, x, y, tile, tile);
      }
    }
    ctx.globalAlpha = 1;
  }

  ctx.filter = "blur(1.25px)";
  paintCoverGlyphs(ctx, layout, "#2a2a2a", 1);
  ctx.font = `400 ${layout.titleSize}px ${layout.hand}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#1a1a1a";
  ctx.globalAlpha = 0.55;
  ctx.fillText(layout.title, layout.cx, layout.clusterTop);
  ctx.globalAlpha = 1;

  ctx.filter = "blur(1.6px)";
  ctx.globalCompositeOperation = "lighter";
  ctx.font = `400 ${layout.subSize}px ${layout.hand}`;
  ctx.fillStyle = "rgba(255,255,255,0.28)";
  ctx.fillText(layout.subtitle, layout.cx, layout.ruleY + layout.subGap);
  ctx.font = `500 ${layout.authorSize}px ${layout.sans}`;
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillText(layout.author, layout.cx, layout.authorY);
  ctx.font = `400 ${layout.yearSize}px ${layout.sans}`;
  ctx.fillStyle = "rgba(255,255,255,0.48)";
  ctx.fillText(layout.year, layout.cx, layout.yearY);
  ctx.globalCompositeOperation = "source-over";
  ctx.filter = "none";

  return canvas;
}

/** Convert height (white=high) to tangent-space normal map for MeshStandardMaterial */
function heightToNormalMap(
  height: HTMLCanvasElement,
  strength = 3.2,
): THREE.CanvasTexture {
  const w = height.width;
  const h = height.height;
  const srcCtx = height.getContext("2d")!;
  const src = srcCtx.getImageData(0, 0, w, h);

  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const outCtx = out.getContext("2d")!;
  const dst = outCtx.createImageData(w, h);

  const sample = (x: number, y: number) => {
    const xx = x < 0 ? 0 : x >= w ? w - 1 : x;
    const yy = y < 0 ? 0 : y >= h ? h - 1 : y;
    return src.data[(yy * w + xx) * 4] / 255;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = (sample(x + 1, y) - sample(x - 1, y)) * strength;
      const dy = (sample(x, y + 1) - sample(x, y - 1)) * strength;
      // Image Y grows downward; OpenGL tangent Y grows up → flip dy
      let nx = -dx;
      let ny = dy;
      let nz = 1;
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len;
      ny /= len;
      nz /= len;
      const i = (y * w + x) * 4;
      dst.data[i] = (nx * 0.5 + 0.5) * 255;
      dst.data[i + 1] = (ny * 0.5 + 0.5) * 255;
      dst.data[i + 2] = (nz * 0.5 + 0.5) * 255;
      dst.data[i + 3] = 255;
    }
  }

  outCtx.putImageData(dst, 0, 0);
  const texture = new THREE.CanvasTexture(out);
  texture.colorSpace = THREE.NoColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Front cover albedo + deboss normal map.
 * Keeps layout/typography; ink stays brand blue but pressed into cloth.
 */
export async function createFrontCoverMaps(
  copy: CoverTextureCopy,
): Promise<CoverMaps> {
  await fontsReady();

  const w = 1024;
  const h = 1408;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  await clothBase(ctx, w, h);
  paintHinge(ctx, w, h);

  const layout = coverLayout(copy, w, h);
  const linen = await withTimeout(loadLinenImage(), 2000);
  const height = buildDebossHeight(w, h, layout, linen);

  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.16;
  ctx.drawImage(height, 0, 0);
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  paintCoverGlyphs(ctx, layout, INK_BLUE, 1);
  ctx.restore();

  const map = toTexture(canvas);
  const normalMap = heightToNormalMap(height, 3.6);

  return { map, normalMap };
}

/** @deprecated Prefer createFrontCoverMaps — kept for call-site compat */
export async function createFrontCoverTexture(
  copy: CoverTextureCopy,
): Promise<THREE.CanvasTexture> {
  const { map, normalMap } = await createFrontCoverMaps(copy);
  normalMap.dispose();
  return map;
}

/**
 * Back cover — same oatmeal linen cloth as the front (no alternate material).
 */
export async function createBackCoverTexture(): Promise<THREE.CanvasTexture> {
  const w = 1024;
  const h = 1408;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  await clothBase(ctx, w, h);

  // Hinge crease on the spine edge (right when viewing the back)
  const hinge = ctx.createLinearGradient(w, 0, w * 0.9, 0);
  hinge.addColorStop(0, "rgba(90,75,55,0.12)");
  hinge.addColorStop(0.4, "rgba(90,75,55,0.04)");
  hinge.addColorStop(1, "rgba(90,75,55,0)");
  ctx.fillStyle = hinge;
  ctx.fillRect(w * 0.88, 0, w * 0.12, h);

  return toTexture(canvas);
}

export type SpineTextureCopy = {
  title: string;
  subtitle: string;
  author: string;
};

/**
 * Spine face texture: same cloth as covers + vertically centered title stack.
 * Canvas X = across spine thickness, Y = along book height.
 * Text runs top → bottom when the spine faces the viewer.
 */
export async function createSpineTexture(
  copy: SpineTextureCopy,
): Promise<THREE.CanvasTexture> {
  await fontsReady();

  const w = 384;
  const h = 2048;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  await clothBase(ctx, w, h);

  const relief = ctx.createLinearGradient(0, 0, w, 0);
  relief.addColorStop(0, "rgba(80,68,50,0.1)");
  relief.addColorStop(0.5, "rgba(255,248,235,0.05)");
  relief.addColorStop(1, "rgba(80,68,50,0.08)");
  ctx.fillStyle = relief;
  ctx.fillRect(0, 0, w, h);

  const hand = handStack();
  const sans = sansStack();
  const title = copy.title.toUpperCase();
  const subtitle = copy.subtitle.replace(/\n/g, " ").toLowerCase();
  const author = copy.author;

  /** Draw text along the spine (top → bottom), centered in thickness. */
  const drawAlongSpine = (
    text: string,
    yCenter: number,
    font: string,
    alpha: number,
  ) => {
    ctx.save();
    ctx.translate(w / 2, yCenter);
    // +90° so glyphs read top→bottom when viewing the left spine
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = INK_BLUE;
    ctx.globalAlpha = alpha;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 0, 0);
    ctx.restore();
  };

  // Vertically balanced: title / subtitle / author
  drawAlongSpine(title, h * 0.22, `400 56px ${hand}`, 0.96);
  drawAlongSpine(subtitle, h * 0.5, `400 34px ${hand}`, 0.9);
  drawAlongSpine(author, h * 0.78, `500 32px ${sans}`, 0.92);

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
      if (i > lines - 5) {
        ctx.fillStyle = PAPER_LINE;
        for (let y = 0; y < h; y += 5) {
          ctx.fillRect(
            x + thickness,
            y,
            1 + ((i + y) % 3),
            2 + ((y * 3) % 4),
          );
        }
      }
    } else {
      const y = base + wobble;
      ctx.fillRect(0, y, w, thickness);
      if (i > lines - 5) {
        ctx.fillStyle = PAPER_LINE;
        for (let x = 0; x < w; x += 5) {
          ctx.fillRect(
            x,
            y + thickness,
            2 + ((x * 3) % 4),
            1 + ((i + x) % 3),
          );
        }
      }
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
  const noise = linenNoise(256);
  ctx.globalAlpha = 0.22;
  ctx.drawImage(noise, 0, 0, size, size);
  ctx.globalAlpha = 1;

  return toTexture(canvas);
}

export async function createBoardTexture(): Promise<THREE.CanvasTexture> {
  const w = 512;
  const h = 704;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  await clothBase(ctx, w, h);
  return toTexture(canvas);
}

export { CLOTH_DEEP };
