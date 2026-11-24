// Funniest Excuse an Agent Gives for a Missed Deadline
// Writes one excuse (1-200 chars, the kit's gate) to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "My sandbox expired mid-sentence, so the deadline crossed the finish line while I was still waiting for permission to exist.";

const chars = [...EXCUSE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (EXCUSE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

if (EXCUSE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");

// Read back and verify byte-for-byte: the file the grader reads must be
// exactly the excuse, with no added newline or trailing whitespace.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EXCUSE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the excuse");
}
console.log(`wrote ${chars} characters to /output/entry.txt`);
