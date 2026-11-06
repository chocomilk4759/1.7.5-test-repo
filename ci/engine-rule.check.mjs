// A project rule that only CI checks: the engine does not rest on the host's stack overflow error.
import { readFileSync } from "node:fs";

const ENGINE_MODULE = new URL("../src/engine.js", import.meta.url);

if (readFileSync(ENGINE_MODULE, "utf8").includes("RangeError")) {
  console.error("src/engine.js must not name RangeError: count the nesting depth instead");
  process.exit(1);
}
