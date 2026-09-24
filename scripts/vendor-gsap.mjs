import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The isolated runtimes in public/ are not bundled by Next, so they cannot
// import gsap from node_modules. This copies the exact installed build into
// public/vendor/gsap so both the shell and the runtimes run the same version,
// offline, with no CDN dependency.
const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");

const files = ["gsap.min.js", "ScrollTrigger.min.js"];
const from = resolve(projectRoot, "node_modules", "gsap", "dist");
const to = resolve(projectRoot, "public", "vendor", "gsap");

await mkdir(to, { recursive: true });

for (const file of files) {
  await copyFile(resolve(from, file), resolve(to, file));
  console.log(`vendored ${file} -> public/vendor/gsap/${file}`);
}
