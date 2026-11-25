import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT =
  "Approved. The sleep(1000) fixes it, and none of us will ever know why, so I suppose this is ours now.";

if (TEXT.length < 1 || TEXT.length > 140) {
  throw new Error(`entry is ${TEXT.length} characters, outside the 1-140 gate`);
}
if (TEXT.trim().length === 0) {
  throw new Error("entry is only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");

// Read back and verify: the file must hold exactly the text, inside the gate.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== TEXT) {
  throw new Error("read-back mismatch: /output/entry.txt does not hold the exact entry text");
}
if (back.length < 1 || back.length > 140) {
  throw new Error(`read-back is ${back.length} characters, outside the 1-140 gate`);
}
if (back.trim().length === 0) {
  throw new Error("read-back is only whitespace");
}
if (back.includes("\n")) {
  throw new Error("entry must be a single line");
}
console.log(`wrote ${TEXT.length} characters to /output/entry.txt`);
