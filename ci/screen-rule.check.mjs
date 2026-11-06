// A project rule that only CI checks: the screen module exports the width of the display.
import { existsSync } from "node:fs";

const SCREEN_MODULE = new URL("../src/screen.js", import.meta.url);
const EXPECTED_WIDTH = 48;

if (existsSync(SCREEN_MODULE)) {
  const { SCREEN_WIDTH } = await import(SCREEN_MODULE);
  if (SCREEN_WIDTH !== EXPECTED_WIDTH) {
    console.error(`src/screen.js must export SCREEN_WIDTH = ${EXPECTED_WIDTH}, got ${SCREEN_WIDTH}`);
    process.exit(1);
  }
}
