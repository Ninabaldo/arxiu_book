/**
 * Syncs src/content/manuscript/ca.md → chapters/*.ca.txt + meta titles + seed build.
 *
 * Heading formats accepted:
 *   **1. Title here**
 *   ## 1. Title here
 *   1. Title here
 *
 * Run: npm run content:sync
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manuscriptPath = join(root, "src/content/manuscript/ca.md");
const chaptersDir = join(root, "src/content/chapters");
const metaPath = join(chaptersDir, "meta.json");

function parseManuscript(md) {
  const text = md.replace(/\r\n/g, "\n");
  const re =
    /(?:^|\n)(?:\*\*(\d+)\.\s+([^*]+)\*\*|#{1,3}\s*(\d+)\.\s+([^\n]+)|(?<![\d.])(\d+)\.\s+([^\n]+))/g;
  const matches = [...text.matchAll(re)];
  if (matches.length === 0) {
    throw new Error(
      "No s’han trobat capítols. Usa el format: **1. Títol** (o ## 1. Títol)",
    );
  }

  const chapters = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const num = Number(m[1] || m[3] || m[5]);
    const title = (m[2] || m[4] || m[6] || "").trim();
    if (!Number.isFinite(num) || num < 1) continue;
    // Skip the book title line if it somehow matches (no chapter body expected at start)
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    let body = text.slice(start, end).trim();
    body = body.replace(/\n{3,}/g, "\n\n").trim() + "\n";
    // Ignore matches that are only inside the intro (empty/very short before first real chapter)
    if (body.trim().length < 40 && chapters.length === 0 && num === 1) {
      // still accept if it's chapter 1 with short body — unlikely
    }
    chapters.push({ num, title, body });
  }

  // Deduplicate by chapter number (keep last)
  const byNum = new Map();
  for (const ch of chapters) byNum.set(ch.num, ch);
  return [...byNum.values()].sort((a, b) => a.num - b.num);
}

function sync() {
  if (!existsSync(manuscriptPath)) {
    throw new Error(`No existeix el manuscript: ${manuscriptPath}`);
  }
  const md = readFileSync(manuscriptPath, "utf8");
  const chapters = parseManuscript(md);
  const meta = JSON.parse(readFileSync(metaPath, "utf8"));

  for (const ch of chapters) {
    const id = String(ch.num).padStart(2, "0");
    const out = join(chaptersDir, `${id}.ca.txt`);
    writeFileSync(out, ch.body, "utf8");

    const row = meta.find((r) => String(r.id) === String(ch.num));
    if (row && ch.title) {
      row.title_ca = ch.title;
    }
    console.log(
      `✓ Capítol ${id}${ch.title ? ` — ${ch.title}` : ""} (${ch.body.length} caràcters)`,
    );
  }

  writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");

  const build = spawnSync("node", [join(root, "scripts/build-seed-translations.mjs")], {
    cwd: root,
    stdio: "inherit",
  });
  if (build.status !== 0) {
    throw new Error("content:build ha fallat");
  }

  console.log(`Sincronitzats ${chapters.length} capítols des de manuscript/ca.md`);
}

sync();
