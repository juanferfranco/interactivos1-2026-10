import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import https from "node:https";

const PLANTUML_VERSION = "1.2026.1";
const JAR_URL = `https://github.com/plantuml/plantuml/releases/download/v${PLANTUML_VERSION}/plantuml-${PLANTUML_VERSION}.jar`;
const ROOT = process.cwd();

const TOOLS_DIR = path.join(ROOT, "tools");
const JAR_PATH = path.join(TOOLS_DIR, "plantuml.jar");
const IN_DIR = path.join(ROOT, "diagrams", "src");
const OUT_DIR = path.join(ROOT, "src", "assets");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: ${res.statusCode} ${res.statusMessage}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

function run(cmd, args, cwd) {
  const r = spawnSync(cmd, args, { cwd, stdio: "inherit" });
  if (r.status !== 0) throw new Error(`${cmd} failed with exit code ${r.status}`);
}

async function main() {
  ensureDir(TOOLS_DIR);
  ensureDir(OUT_DIR);
  ensureDir(IN_DIR);

  if (!fs.existsSync(JAR_PATH)) {
    console.log(`Downloading PlantUML ${PLANTUML_VERSION}...`);
    await download(JAR_URL, JAR_PATH);
  }

  const files = fs.readdirSync(IN_DIR).filter(f => f.endsWith(".puml"));
  if (files.length === 0) {
    console.log("No .puml files found in diagrams/src/");
    return;
  }

  // PlantUML -o es relativo al directorio del archivo/cwd
  const relOut = path.relative(IN_DIR, OUT_DIR) || ".";

  for (const f of files) {
    console.log(`Generating SVG for ${f}...`);
    run("java", ["-jar", JAR_PATH, "-tsvg", "-o", relOut, f], IN_DIR);
  }

  console.log("Done. SVGs are in src/assets/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
