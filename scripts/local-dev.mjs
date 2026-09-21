// Local dev wrapper — intercepts ECONNRESET from Miniflare/Workerd IPC and retries
// Usage: node scripts/local-dev.mjs
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const node = process.execPath;
const vite = join(root, "node_modules", "vite", "bin", "vite.js");

let attempts = 0;
const MAX_ATTEMPTS = 5;

function run() {
  attempts++;
  console.log(`\n[local-dev] Starting dev server (attempt ${attempts}/${MAX_ATTEMPTS})...`);

  const child = spawn(node, [vite, "dev"], {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      CLOUDFLARE_CF_FETCH_ENABLED: "false",
      WRANGLER_SEND_METRICS: "false",
      WRANGLER_WRITE_LOGS: "false",
      WRANGLER_LOG_PATH: ".wrangler/logs",
      WRANGLER_REGISTRY_PATH: ".wrangler/dev-registry",
      MINIFLARE_REGISTRY_PATH: ".wrangler/registry",
    },
  });

  child.on("exit", (code) => {
    if (code === 0 || code === null) {
      // Normal exit (Ctrl+C)
      process.exit(0);
    }
    if (code === 1 && attempts < MAX_ATTEMPTS) {
      console.log(`[local-dev] Server exited with code 1 (likely ECONNRESET). Retrying in 2s...`);
      setTimeout(run, 2000);
    } else {
      console.log(`[local-dev] Server exited with code ${code}. Giving up after ${attempts} attempts.`);
      process.exit(code ?? 1);
    }
  });

  child.on("error", (err) => {
    console.error("[local-dev] Child process error:", err.message);
    if (attempts < MAX_ATTEMPTS) {
      setTimeout(run, 2000);
    } else {
      process.exit(1);
    }
  });
}

run();
