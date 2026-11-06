// Behavior tests for the calculation engine's public functions.

import { test } from "node:test";
import assert from "node:assert/strict";

import { CalculationError, evaluate } from "../src/engine.js";

function assertValues(cases) {
  for (const [expression, expected] of cases) {
    assert.equal(
      evaluate(expression),
      expected,
      `evaluate(${JSON.stringify(expression)})`,
    );
  }
}

// Digit strings written without an exponent: LARGEST_POWER_OF_TEN is 1e308,
// the largest power of ten a double holds, and OVERFLOW_POWER_OF_TEN is 1e309,
// which is not finite.
const LARGEST_POWER_OF_TEN = `1${"0".repeat(308)}`;
const OVERFLOW_POWER_OF_TEN = `${LARGEST_POWER_OF_TEN}0`;

// Candidate positions are the 0-based character positions the message may
// name; null accepts any position from 0 up to the expression length.
function assertRejected(expression, candidates) {
  const accepted =
    candidates ?? Array.from({ length: expression.length + 1 }, (_, i) => i);
  assert.throws(
    () => evaluate(expression),
    (error) => {
      assert.ok(error instanceof CalculationError, "throws a CalculationError");
      const reported = (error.message.match(/\d+/g) ?? []).map(Number);
      assert.ok(
        accepted.some((position) => reported.includes(position)),
        `message "${error.message}" names none of the positions ${accepted}`,
      );
      return true;
    },
    `evaluate(${JSON.stringify(expression)}) must throw`,
  );
}

function messageOf(expression) {
  try {
    evaluate(expression);
  } catch (error) {
    return error.message;
  }
  return assert.fail(`evaluate(${JSON.stringify(expression)}) must throw`);
}

// The message without its numbers, so that only the stated reason is left.
function reasonOf(expression) {
  return messageOf(expression).replace(/\d+/g, "");
}

function assertAllRejected(cases) {
  for (const [expression, candidates] of cases) {
    assertRejected(expression, candidates);
  }
}

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
    let outcome;
    try {
      outcome = evaluate(expression);
    } catch (error) {
      outcome = error;
    }
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
  ];
  const reasons = expressions.map(reasonOf);
  for (const reason of reasons) {
    assert.notEqual(
      reason.trim(),
      "",
      "the message holds more than a position",
    );
  }
  assert.equal(new Set(reasons).size, expressions.length, reasons.join(" | "));
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
