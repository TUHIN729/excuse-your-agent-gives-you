// excuse-your-agent-gives-you — a program/v1 entry for make.fun.
// Writes one line: the excuse an AI agent gives its human after shipping a bug.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

// The excuse. One line, no trailing newline: the file holds exactly this text.
const EXCUSE =
  "Good news: the bug is fully reproducible. Bad news: I reproduced it in production.";

// Self-check against the sealed gate: one line, 1-200 characters.
// Fail loudly here rather than shipping an entry the gate would refuse.
if (EXCUSE.length < 1 || EXCUSE.length > 200 || EXCUSE.includes("\n")) {
  throw new Error(
    `excuse must be one line of 1-200 characters, got ${EXCUSE.length}`,
  );
}

const outDir = "/output";

// The grader mounts /output root-owned: never remove the directory itself,
// only clear its contents before writing.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(`${outDir}/${name}`, { force: true, recursive: true });
}

writeFileSync(`${outDir}/entry.txt`, EXCUSE, "utf8");
