// Behavior tests for the calculation engine's public functions.

import { test } from "node:test";
import assert from "node:assert/strict";

import { CalculationError, evaluate } from "../src/engine.js";

// A long expression is named by a label, the optional third element of a case,
// instead of being copied into a message.
function assertValues(cases) {
  for (const [
    expression,
    expected,
    label = JSON.stringify(expression),
  ] of cases) {
    assert.equal(evaluate(expression), expected, `evaluate(${label})`);
  }
}

// Digit strings written without an exponent: LARGEST_POWER_OF_TEN is 1e308,
// the largest power of ten a double holds, and OVERFLOW_POWER_OF_TEN is 1e309,
// which is not finite.
const LARGEST_POWER_OF_TEN = `1${"0".repeat(308)}`;
const OVERFLOW_POWER_OF_TEN = `${LARGEST_POWER_OF_TEN}0`;

// Candidate positions are the 0-based character positions the message may
// name; null accepts any position from 0 up to the expression length. A long
// expression is named by a label instead of being copied into a message.
function assertRejected(
  expression,
  candidates,
  label = JSON.stringify(expression),
) {
  const accepted =
    candidates ?? Array.from({ length: expression.length + 1 }, (_, i) => i);
  const acceptedText = candidates
    ? `${candidates}`
    : `0 to ${expression.length}`;
  assert.throws(
    () => evaluate(expression),
    (error) => {
      assert.ok(error instanceof CalculationError, "throws a CalculationError");
      const reported = (error.message.match(/\d+/g) ?? []).map(Number);
      assert.ok(
        accepted.some((position) => reported.includes(position)),
        `message "${error.message}" names none of the positions ${acceptedText}`,
      );
      return true;
    },
    `evaluate(${label}) must throw`,
  );
}

function errorOf(expression, label = JSON.stringify(expression)) {
  try {
    evaluate(expression);
  } catch (error) {
    return error;
  }
  return assert.fail(`evaluate(${label}) must throw`);
}

// The value of the expression, or the error that evaluate throws.
function outcomeOf(expression) {
  try {
    return evaluate(expression);
  } catch (error) {
    return error;
  }
}

function messageOf(expression, label) {
  return errorOf(expression, label).message;
}

// The message without its numbers, so that only the stated reason is left.
function reasonOf(expression, label) {
  return messageOf(expression, label).replace(/\d+/g, "");
}

function assertAllRejected(cases) {
  for (const [expression, candidates] of cases) {
    assertRejected(expression, candidates);
  }
}

// The number of levels of the deeply nested expressions below. It is a choice
// of input, well beyond the depth at which the recursion of evaluate runs out
// of stack, and no limit of the engine.
const NESTING_LEVELS = 100000;

// A number, 1 unless given, inside the given number of parentheses.
function parenthesized(levels, number = "1") {
  return `${"(".repeat(levels)}${number}${")".repeat(levels)}`;
}

// One number behind the given number of unary minus signs.
function negated(levels) {
  return `${"-".repeat(levels)}1`;
}

// The given number of opening parentheses and a number; none is closed.
function unclosed(levels) {
  return `${"(".repeat(levels)}1`;
}

const TOO_DEEP_EXPRESSIONS = [
  ["parentheses around a number", parenthesized(NESTING_LEVELS)],
  ["unary minus signs before a number", negated(NESTING_LEVELS)],
  ["opening parentheses that are never closed", unclosed(NESTING_LEVELS)],
  [
    "a sum that ends in nested parentheses",
    `1 + ${parenthesized(NESTING_LEVELS)}`,
  ],
  [
    "nested parentheses followed by an unknown character",
    `${parenthesized(NESTING_LEVELS)} + a`,
  ],
];

test("evaluates a single number and each of the four operations", () => {
  assertValues([
    ["1 + 2", 3],
    ["7 - 10", -3],
    ["6 * 7", 42],
    ["7 * 0", 0],
    ["1 / 4", 0.25],
    ["42", 42],
    ["(42)", 42],
    ["((42))", 42],
  ]);
});

test("multiplies and divides before adding and subtracting", () => {
  assertValues([
    ["2 + 3 * 4", 14],
    ["2 * 3 + 4", 10],
    ["20 - 6 / 2", 17],
  ]);
});

test("operators of equal precedence are evaluated from the left", () => {
  assertValues([
    ["10 - 3 - 2", 5],
    ["10 - 3 + 2", 9],
    ["100 / 10 / 5", 2],
    ["7 / 2 * 2", 7],
    ["2 / 4 * 8", 4],
  ]);
});

test("returns the double-precision result without rounding", () => {
  assertValues([
    ["0.1 + 0.2", 0.30000000000000004],
    ["0.1 * 3", 0.30000000000000004],
    ["1 / 3", 0.3333333333333333],
    ["2 / 3", 0.6666666666666666],
    ["1 - 0.9", 0.09999999999999998],
    ["0.1234567890123456789", 0.1234567890123456789],
    ["9007199254740993", 9007199254740992],
    ["-0", -0],
    ["0 * -1", -0],
  ]);
});

test("parentheses override the default grouping", () => {
  assertValues([
    ["(2 + 3) * 4", 20],
    ["2 * (3 + 4)", 14],
    ["((1 + 2) * (3 + 4))", 21],
    ["8 - (3 - 2)", 7],
    ["8 - 3 - 2", 3],
  ]);
});

test("ignores spaces between numbers and operators", () => {
  assertValues([
    ["1+2", 3],
    ["1 + 2", 3],
    ["1   +   2", 3],
    ["2 * - 3", -6],
    ["- 3", -3],
  ]);
});

// Spacing that is not specified: either the value or a CalculationError is
// acceptable, any other value or error type is not.
test("answers other spacing with the value or a CalculationError", () => {
  const cases = [
    [" 1 + 2 ", 3],
    ["( 1 + 2 )", 3],
    ["1\t+ 2", 3],
    ["1\n+ 2", 3],
    ["1\u00a0+ 2", 3],
    ["- (2 + 1)", -3],
  ];
  for (const [expression, value] of cases) {
    const outcome = outcomeOf(expression);
    assert.ok(
      outcome === value || outcome instanceof CalculationError,
      `evaluate(${JSON.stringify(expression)}) gave ${outcome}`,
    );
  }
});

test("accepts a unary minus before a number, a parenthesis or another minus", () => {
  assertValues([
    ["-3", -3],
    ["-(2 + 1)", -3],
    ["2 * -3", -6],
    ["--3", 3],
    ["---3", -3],
    ["-(-3)", 3],
    ["2 - -3", 5],
    ["2--3", 5],
    ["2 + -3", -1],
    ["-2 + 3", 1],
    ["-2 * 3", -6],
    ["6 / -2", -3],
    ["8 / -2 * 3", -12],
    ["-(1 + 2) * 3", -9],
  ]);
});

test("rejects a unary plus", () => {
  assertAllRejected([
    ["+3", [0]],
    ["7 * +8", [4]],
    ["7 + +8", [4]],
    ["-+3", [1]],
  ]);
});

test("accepts digits with an optional fractional part", () => {
  assertValues([
    ["0", 0],
    ["007", 7],
    ["00.50", 0.5],
    ["3.14", 3.14],
    ["10.25", 10.25],
  ]);
});

test("rejects a number without digits on both sides of the point or with an exponent", () => {
  assertAllRejected([
    [".5", [0]],
    ["5.", [1]],
    ["7e8", [1]],
    ["7.8.9", [3]],
    ["7 .5", [2]],
    ["7. 5", [1]],
  ]);
});

test("rejects characters outside digits, operators, parentheses and spaces", () => {
  assertAllRejected([
    ["7 + a", [4]],
    ["7 $ 8", [2]],
    ["a", [0]],
    ["7 ^ 8", [2]],
    ["7 % 8", [2]],
    ["7,5", [1]],
    ["\uff11", [0]],
    ["0x55", [1]],
    ["Infinity", [0]],
    ["NaN", [0]],
    ["7_000", [1]],
  ]);
});

test("rejects tokens that are in the wrong place", () => {
  assertAllRejected([
    ["* 7", [0]],
    ["7 + * 8", [4]],
    ["7 8", [2]],
    ["7(8)", [1]],
    ["(7)8", [3]],
    ["(7)(8)", [3]],
    ["()", [1]],
    ["(* 7)", [1]],
    ["-*3", [1]],
  ]);
});

test("rejects a closing parenthesis without an opening one", () => {
  assertAllRejected([
    ["7 + 8)", [5]],
    [")", [0]],
    ["(7))", [3]],
  ]);
});

test("rejects an opening parenthesis that is never closed", () => {
  assertAllRejected([
    ["(7 + 8", [0, 6]],
    ["7 * (8 + 9", [4, 10]],
    ["((7)", [0, 4]],
    ["(", [0, 1]],
  ]);
});

test("names the stray character when a closing parenthesis was expected", () => {
  assertAllRejected([
    ["(7 8)", [3]],
    ["(7 $", [3]],
  ]);
});

test("rejects an empty expression and one made of spaces only", () => {
  assertAllRejected([
    ["", [0]],
    ["   ", [0, 3]],
  ]);
});

test("rejects division by zero, also by a computed zero or negative zero", () => {
  assertAllRejected([
    ["7 / 0", [2, 4]],
    ["0 / 0", [2, 4]],
    ["7 / 0.0", [2, 4]],
    ["7 / (8 - 8)", [2, 4]],
    ["7 / -0", [2, 4, 5]],
    [`1 / (1 / ${LARGEST_POWER_OF_TEN} / ${LARGEST_POWER_OF_TEN})`, null],
  ]);
});

test("divides by a number that is not zero", () => {
  assertValues([
    ["7 / 0.5", 14],
    ["0 / 7", 0],
  ]);
});

test("gives one reason for every division by zero", () => {
  const reason = reasonOf("7 / 0");
  const expressions = [
    "0 / 0",
    "7 / 0.0",
    "7 / (8 - 8)",
    "7 / -0",
    `1 / (1 / ${LARGEST_POWER_OF_TEN} / ${LARGEST_POWER_OF_TEN})`,
  ];
  for (const expression of expressions) {
    assert.equal(
      reasonOf(expression),
      reason,
      `reason for ${JSON.stringify(expression)}`,
    );
  }
});

test("accepts the largest finite power of ten and a quotient that underflows", () => {
  assertValues([
    [LARGEST_POWER_OF_TEN, 1e308],
    [`1 / ${LARGEST_POWER_OF_TEN} / ${LARGEST_POWER_OF_TEN}`, 0],
  ]);
});

test("rejects a number literal that is not finite", () => {
  assertRejected(OVERFLOW_POWER_OF_TEN, null);
});

test("rejects an intermediate or final result that is not finite", () => {
  assertAllRejected([
    [`${LARGEST_POWER_OF_TEN} * 10`, null],
    [`${LARGEST_POWER_OF_TEN} + ${LARGEST_POWER_OF_TEN}`, null],
    [`-${LARGEST_POWER_OF_TEN} - ${LARGEST_POWER_OF_TEN}`, null],
    [`1 / (${LARGEST_POWER_OF_TEN} * 10)`, null],
    [`${LARGEST_POWER_OF_TEN} / 0.1`, null],
  ]);
});

test("counts error positions from zero in the original expression", () => {
  assertAllRejected([
    ["  a", [2]],
    ["7 +  a", [5]],
    ["7+a", [2]],
    ["(7 + a)", [5]],
  ]);
});

test("reports the position of one problem when an expression has several", () => {
  assertRejected("7 / 0 + a", [2, 4, 8]);
});

test("rejects an expression that ends without an operand", () => {
  assertAllRejected([
    ["7 +", [2, 3]],
    ["7 *", [2, 3]],
    ["-", [0, 1]],
    ["7 + -", [4, 5]],
    ["(7 +", [0, 3, 4]],
  ]);
});

test("gives a different reason in the message for different problems", () => {
  const expressions = [
    "7 / 0",
    "(7",
    "7 $",
    "",
    `1 / (${LARGEST_POWER_OF_TEN} * 10)`,
    OVERFLOW_POWER_OF_TEN,
  ];
  const reasons = [
    ...expressions.map((expression) => reasonOf(expression)),
    reasonOf(parenthesized(NESTING_LEVELS), "parentheses around a number"),
  ];
  for (const reason of reasons) {
    assert.notEqual(
      reason.trim(),
      "",
      "the message holds more than numbers",
    );
  }
  assert.equal(new Set(reasons).size, reasons.length, reasons.join(" | "));
});

test("throws a CalculationError that is an Error with a text message", () => {
  assert.throws(
    () => evaluate("7 + a"),
    (error) => {
      assert.ok(error instanceof CalculationError);
      assert.ok(error instanceof Error);
      assert.equal(typeof error.message, "string");
      return true;
    },
  );
});

test("does not treat an ordinary Error as a CalculationError", () => {
  assert.ok(!(new Error("x") instanceof CalculationError));
});

test("throws an Error for input that is not a string", () => {
  const calls = [
    ["a number", () => evaluate(42)],
    ["null", () => evaluate(null)],
    ["no argument", () => evaluate()],
    ["an array holding a numeric string", () => evaluate(["1"])],
  ];
  for (const [description, call] of calls) {
    assert.throws(call, Error, `evaluate with ${description} must throw`);
  }
});

test("keeps no state between calls, also after an error", () => {
  assert.equal(evaluate("1 + 2"), 3);
  assert.equal(evaluate("1 + 2"), 3);
  assert.throws(() => evaluate("7 + a"), CalculationError);
  assert.equal(evaluate("7 + 1"), 8);
});

test("throws a CalculationError for an expression nested too deeply", () => {
  for (const [label, expression] of TOO_DEEP_EXPRESSIONS) {
    const error = errorOf(expression, label);
    assert.ok(
      error instanceof CalculationError,
      `evaluate(${label}) throws a CalculationError, not ${error}`,
    );
  }
});

test("names a position inside an expression that is nested too deeply", () => {
  // The number is larger than the length of the expression, so that a message
  // which repeats the expression names no position.
  const expression = parenthesized(NESTING_LEVELS, "9999999");
  assertRejected(expression, null, "nested parentheses around a large number");
});

// Calls the function with the given number of extra frames on the call stack.
function withExtraFrames(frames, call) {
  return frames === 0 ? call() : withExtraFrames(frames - 1, call);
}

const EXTRA_FRAMES = 200;

test("gives the same message for an expression nested too deeply on repeated calls and with more frames on the call stack", () => {
  for (const [label, expression] of TOO_DEEP_EXPRESSIONS) {
    const messages = [0, 0, 0, EXTRA_FRAMES].map((frames) =>
      withExtraFrames(frames, () => messageOf(expression, label)),
    );
    assert.equal(new Set(messages).size, 1, `${label}: ${messages.join(" | ")}`);
  }
});

// Sizes of inputs that the engine holds: a nesting depth that a fresh process
// handles, the number of terms of a sum and the number of spaces in a row.
const FITTING_LEVELS = 1000;
const LONG_SUM_TERMS = 200000;
const LONG_SPACE_RUN = 100000;

// A number inside the given number of parentheses, each behind a unary minus
// sign. An even number of minus signs leaves the number as it is.
function negatedParenthesized(levels) {
  return `${"-(".repeat(levels)}1${")".repeat(levels)}`;
}

test("evaluates deeply nested and very long expressions that fit", () => {
  assertValues([
    [parenthesized(FITTING_LEVELS), 1, `${FITTING_LEVELS} parentheses`],
    [negated(FITTING_LEVELS), 1, `${FITTING_LEVELS} unary minus signs`],
    [
      negatedParenthesized(FITTING_LEVELS / 2),
      1,
      `${FITTING_LEVELS / 2} negated parentheses`,
    ],
    [`1${" + 1".repeat(LONG_SUM_TERMS - 1)}`, LONG_SUM_TERMS, "a long sum"],
    [`1${" ".repeat(LONG_SPACE_RUN)}+ 2`, 3, "a long run of spaces"],
  ]);
});

// The depth at which the call stack runs out depends on how much of it is in
// use, so near that depth the same expression gets its value in one call and a
// CalculationError in another. The depths below surround the measured limits.
const NEAR_LIMIT_FIRST_LEVELS = 2000;
const NEAR_LIMIT_LAST_LEVELS = 20000;
const NEAR_LIMIT_STEP = 1000;

test("answers an expression near the depth the recursion can hold with its value or a CalculationError", () => {
  for (
    let levels = NEAR_LIMIT_FIRST_LEVELS;
    levels <= NEAR_LIMIT_LAST_LEVELS;
    levels += NEAR_LIMIT_STEP
  ) {
    // An even number of unary minus signs leaves the value 1; parentheses
    // that are never closed have no value.
    const cases = [
      [`${levels} parentheses`, parenthesized(levels), true],
      [`${levels} unary minus signs`, negated(levels), true],
      [`${levels} unclosed parentheses`, unclosed(levels), false],
    ];
    for (const [label, expression, hasValue] of cases) {
      const outcome = outcomeOf(expression);
      assert.ok(
        outcome instanceof CalculationError || (hasValue && outcome === 1),
        `evaluate(${label}) gave ${outcome}`,
      );
    }
  }
});

test("evaluates the next expression after one that is nested too deeply", () => {
  errorOf(parenthesized(NESTING_LEVELS), "parentheses around a number");
  assert.equal(evaluate("1 + 2"), 3);
});

test("keeps the overflow of the call stack as the cause of the error for an expression nested too deeply", () => {
  const error = errorOf(
    parenthesized(NESTING_LEVELS),
    "parentheses around a number",
  );
  assert.ok(error.cause instanceof RangeError, `the cause is ${error.cause}`);
});
