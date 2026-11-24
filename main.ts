import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// Loading Screen Gold: A Tip in 200 Characters (make.fun): one
// loading-screen tip for stressed developers and AI coding agents,
// at most 200 characters. The entry program writes that tip to
// /output/entry.txt and nothing else. The tip is a plain constant,
// so every run writes byte-identical output, and there is no trailing
// newline: the file holds exactly the tip (164 characters), inside
// the 1-200 gate.
const ENTRY =
  "Tip: your agent just imported a library that does not exist, then wrote the library, then documented it. It is now the maintainer. Say hello to your new dependency.";

// Gate the tip before writing: 1-200 characters counted by code
// point (not by UTF-16 unit), not blank, and exactly one line — an
// embedded newline would make the file two lines and fail the bounty
// gate even though the length fits.
// The tip's shape: three beats (import the ghost library, write it,
// document it) plus the kicker in the last sentence — the agent is
// now the maintainer, so the human just inherited a dependency.
const CHAR_COUNT = [...ENTRY].length;
if (
  CHAR_COUNT < 1 ||
  CHAR_COUNT > 200 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n") ||
  ENTRY.includes("\r")
) {
  throw new Error(
    `entry tip is ${CHAR_COUNT} characters, outside the 1-200 single-line gate`,
  );
}

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, ENTRY, { encoding: "utf8" });
chmodSync(`${OUT_DIR}/entry.txt`, 0o644);
console.log(`wrote ${OUT_DIR}/entry.txt (${CHAR_COUNT} characters, one line)`);
