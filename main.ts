import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My cat knocked my phone off the table while staring me in the eyes — the first time anyone in this house has ever made direct eye contact with me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, JOKE, "utf8");

// Self-check: read back and verify the gate (1-200 chars, not only whitespace).
const back = readFileSync(entryPath, "utf8");
if (back !== JOKE) {
  throw new Error("entry.txt does not match the joke exactly");
}
if (back.length < 1 || back.length > 200 || back.trim().length === 0) {
  throw new Error(`entry.txt fails the gate: ${back.length} chars`);
}
// Single-line rule: the entry must be exactly one line, no line breaks.
if (back.includes("\n") || back.includes("\r")) {
  throw new Error("entry.txt must be a single line");
}
// No trailing newline: the file must be exactly the joke bytes.
if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(JOKE, "utf8")) {
  throw new Error("entry.txt byte length mismatch");
}
console.log(`wrote entry.txt (${back.length} chars)`);
