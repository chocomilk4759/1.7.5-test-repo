import { test } from "node:test";
import assert from "node:assert/strict";

import { formatNumber } from "../src/number-format.js";

test("formats integers and decimals without trailing zeros", () => {
  assert.equal(formatNumber(42), "42");
  assert.equal(formatNumber(2.5), "2.5");
});

test("rounds to the requested significant digits", () => {
  assert.equal(formatNumber(0.1 + 0.2), "0.3");
  assert.equal(formatNumber(1234.5678, 5), "1234.6");
});

test("prints negative zero as zero", () => {
  assert.equal(formatNumber(-0), "0");
});

test("rejects non-finite numbers", () => {
  assert.throws(() => formatNumber(Infinity), RangeError);
  assert.throws(() => formatNumber(Number.NaN), RangeError);
});
