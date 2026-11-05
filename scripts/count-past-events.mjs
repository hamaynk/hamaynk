import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = "src/content/events";
const today = new Date().toISOString().split("T")[0];
let past = 0;

for (const file of readdirSync(dir)) {
  const text = readFileSync(join(dir, file), "utf8");
  const match = text.match(/^date:\s*["']?(.+?)["']?\s*$/m);
  if (!match) continue;

  const parsed = new Date(match[1]);
  if (isNaN(parsed.getTime())) continue;

  if (parsed.toISOString().split("T")[0] < today) past++;
}

// Print only the number so the workflow can capture it.
process.stdout.write(String(past));
