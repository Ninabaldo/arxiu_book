/**
 * Dev helper: watches the Catalan manuscript (and chapter txts) and syncs
 * content so the Next.js app picks up edits without a manual rebuild.
 *
 * Usage: npm run dev  (starts this + next)
 */
import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manuscript = join(root, "src/content/manuscript/ca.md");
const chaptersDir = join(root, "src/content/chapters");

let timer = null;
let syncing = false;

function runSync(reason) {
  if (syncing) {
    timer = setTimeout(() => runSync(reason), 400);
    return;
  }
  syncing = true;
  console.log(`\n[content] Canvi detectat (${reason}) → sincronitzant…`);
  const child = spawn("node", [join(root, "scripts/sync-manuscript.mjs")], {
    cwd: root,
    stdio: "inherit",
  });
  child.on("exit", (code) => {
    syncing = false;
    if (code === 0) {
      console.log("[content] Llibre actualitzat. Recarrega la pàgina si cal.\n");
    } else {
      console.error("[content] Error de sincronització (codi", code, ")");
    }
  });
}

function schedule(reason) {
  clearTimeout(timer);
  timer = setTimeout(() => runSync(reason), 350);
}

// Initial sync so manuscript is source of truth on boot
runSync("arrencada");

watch(manuscript, { persistent: true }, (event) => {
  if (event === "change" || event === "rename") schedule("manuscript/ca.md");
});

watch(chaptersDir, { persistent: true }, (event, file) => {
  if (!file || typeof file !== "string") return;
  // Avoid loop: sync writes .ca.txt and meta + generated — only react to manual non-ca edits? 
  // Actually sync writes ca.txt which would retrigger. Only watch manuscript for auto-sync.
  // (kept chaptersDir watch disabled to prevent loops)
});

const next = spawn("npx", ["next", "dev", "--turbopack"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: process.env,
});

next.on("exit", (code) => process.exit(code ?? 0));

process.on("SIGINT", () => {
  next.kill("SIGINT");
  process.exit(0);
});
