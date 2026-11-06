// Behavior tests for the calculator screen's public functions.

import { test } from "node:test";
import assert from "node:assert/strict";

import { CalculationError, evaluate } from "../src/engine.js";
import { renderScreen } from "../src/screen.js";

// Digit strings written without an exponent: LARGEST_POWER_OF_TEN is 1e308,
// the largest power of ten a double holds, and OVERFLOW_POWER_OF_TEN is 1e309,
// which is not finite.
const LARGEST_POWER_OF_TEN = `1${"0".repeat(308)}`;
const OVERFLOW_POWER_OF_TEN = `${LARGEST_POWER_OF_TEN}0`;

// The line the screen shows for an expression that evaluate rejects: the
// reason evaluate gives, behind the error prefix. Taking the reason from
// evaluate keeps its wording out of these tests.
function errorLineOf(expression) {
  try {
    evaluate(expression);
  } catch (error) {
    assert.ok(
      error instanceof CalculationError,
      `evaluate(${JSON.stringify(expression)}) throws a CalculationError`,
    );
    return `오류: ${error.message}`;
  }
  return assert.fail(`evaluate(${JSON.stringify(expression)}) must throw`);
}

function thrownBy(call, label) {
  try {
    call();
  } catch (error) {
    return error;
  }
  return assert.fail(`${label} must throw`);
}

function assertLines(cases) {
  for (const [expression, expected] of cases) {
    assert.equal(
      renderScreen(expression),
      expected,
      `renderScreen(${JSON.stringify(expression)})`,
    );
  }
}

function assertErrorLines(expressions) {
  assertLines(
    expressions.map((expression) => [expression, errorLineOf(expression)]),
  );
}

test("renders the expression, an equals sign and the result as one line", () => {
  assertLines([
    ["1 + 2", "1 + 2 = 3"],
    ["42", "42 = 42"],
    ["(42)", "(42) = 42"],
    ["(2 + 3) * 4", "(2 + 3) * 4 = 20"],
    ["10 - 3 - 2", "10 - 3 - 2 = 5"],
    ["-3", "-3 = -3"],
    ["--3", "--3 = 3"],
    ["2 * -3", "2 * -3 = -6"],
    ["0", "0 = 0"],
    ["1 - 1", "1 - 1 = 0"],
  ]);
});

test("keeps the spacing inside the expression as received", () => {
  assertLines([
    ["1+2", "1+2 = 3"],
    ["1   +   2", "1   +   2 = 3"],
    ["2 * - 3", "2 * - 3 = -6"],
  ]);
});

test("shows the result with at most twelve significant digits", () => {
  assertLines([
    ["0.1 + 0.2", "0.1 + 0.2 = 0.3"],
    ["1 / 3", "1 / 3 = 0.333333333333"],
    ["2 / 3", "2 / 3 = 0.666666666667"],
    ["7 / 2", "7 / 2 = 3.5"],
    ["-0", "-0 = 0"],
    ["0 * -1", "0 * -1 = 0"],
    ["123456789012345", "123456789012345 = 123456789012000"],
    ["1000000 * 1000000", "1000000 * 1000000 = 1000000000000"],
    [
      "10000000000 * 10000000000 * 10",
      "10000000000 * 10000000000 * 10 = 1e+21",
    ],
  ]);
});

test("returns an error line instead of throwing for a rejected expression", () => {
  const rejected = [
    "7 / 0",
    "7 / (8 - 8)",
    "(7",
    "7 + 8)",
    "7 $ 8",
    "a",
    "* 7",
    "7 8",
    "()",
    "7 +",
    OVERFLOW_POWER_OF_TEN,
    `${LARGEST_POWER_OF_TEN} * 10`,
    `1 / (${LARGEST_POWER_OF_TEN} * 10)`,
  ];
  assertErrorLines(rejected);
});

// Nested far deeper than the recursion of evaluate can hold.
const NESTING_LEVELS = 100000;
const NESTED_TOO_DEEP =
  "(".repeat(NESTING_LEVELS) + "1" + ")".repeat(NESTING_LEVELS);

test("throws what evaluate throws when that is not a calculation error", () => {
  const cases = [
    ["a number", [42]],
    ["zero", [0]],
    ["null", [null]],
    ["no argument", []],
    ["an array holding a number text", [["1"]]],
    ["an empty array", [[]]],
    ["an array holding a space", [[" "]]],
    ["an expression nested too deeply", [NESTED_TOO_DEEP]],
  ];
  for (const [label, args] of cases) {
    const expected = thrownBy(
      () => evaluate(...args),
      `evaluate for ${label}`,
    );
    const actual = thrownBy(
      () => renderScreen(...args),
      `renderScreen for ${label}`,
    );
    assert.ok(
      !(actual instanceof CalculationError),
      `${label} must not become a calculation error`,
    );
    assert.equal(actual.constructor, expected.constructor, label);
    assert.equal(actual.message, expected.message, label);
  }
});

test("returns an empty text for an empty expression and for spaces only", () => {
  assertLines([
    ["", ""],
    [" ", ""],
    ["   ", ""],
  ]);
});

test("reports an error at its position in the expression as received", () => {
  const withLeadingSpaces = ["  a", " 7 + a"];
  // The failure of "7 +  " is at its end, so the trailing spaces move the
  // position; the failure of "7 + a  " is at "a", which they do not move.
  assertErrorLines([...withLeadingSpaces, "7 + a  ", "7 +  "]);
  for (const expression of withLeadingSpaces) {
    assert.notEqual(
      errorLineOf(expression),
      errorLineOf(expression.trimStart()),
      `the leading spaces of ${JSON.stringify(expression)} move the position`,
    );
  }
});

test("does not take white space other than a space for a space", () => {
  const expressions = [
    "1\t+ 2",
    "1\n+ 2",
    "1\r+ 2",
    "1\u00a0+ 2",
    "\t1 + 2",
    "1 + 2\n",
  ];
  assertErrorLines(expressions);
  for (const expression of expressions) {
    assert.ok(
      !/[\r\n]/.test(renderScreen(expression)),
      `the line for ${JSON.stringify(expression)} has no line break`,
    );
  }
});

const DISPLAY_WIDTH = 48;

test("returns a line longer than the display whole", () => {
  const longValueLine = renderScreen(
    "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12",
  );
  assert.equal(
    longValueLine,
    "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 = 78",
  );
  assert.ok(longValueLine.length > DISPLAY_WIDTH);

  // The error is at the end of an expression a thousand characters long, so
  // the four digits of its position widen the error line past the display.
  const longErrorExpression = "7 +".padEnd(1000);
  const longErrorLine = renderScreen(longErrorExpression);
  assert.equal(longErrorLine, errorLineOf(longErrorExpression));
  assert.ok(longErrorLine.length > DISPLAY_WIDTH);
});

test("exports only the display width and the render function", async () => {
  const screenModule = await import("../src/screen.js");
  assert.deepEqual(Object.keys(screenModule).sort(), [
    "SCREEN_WIDTH",
    "renderScreen",
  ]);
});

test("gives the same line for a repeated call, also after an error", () => {
  const rejected = "7 + a";
  const repeated = [
    ["1 + 2", "1 + 2 = 3"],
    ["   ", ""],
    [rejected, errorLineOf(rejected)],
  ];
  assertLines(repeated.flatMap((row) => [row, row]));
  assertLines([["7 + 1", "7 + 1 = 8"]]);
});

// The requirements do not settle some inputs, so each of these tests accepts
// the answers listed for the input and nothing else.
function assertOneOf(expression, accepted) {
  const line = renderScreen(expression);
  assert.ok(
    accepted.includes(line),
    `renderScreen(${JSON.stringify(expression)}) gave ${JSON.stringify(line)}`,
  );
}

test("answers white space other than a space with an empty text or an error line", () => {
  const expressions = ["\t", "\n", "\r\n", "\u00a0", "\u3000", " \t "];
  for (const expression of expressions) {
    assertOneOf(expression, ["", errorLineOf(expression)]);
  }
});

test("answers spaces around an expression with the text as received or trimmed", () => {
  assertOneOf(" 1 + 2 ", [" 1 + 2  = 3", "1 + 2 = 3"]);
  assertOneOf("  7", ["  7 = 7", "7 = 7"]);
  assertOneOf("7  ", ["7   = 7", "7 = 7"]);
});
