// Behavior tests for the unit conversion module's public functions.

import { test } from "node:test";
import assert from "node:assert/strict";
import { inspect } from "node:util";

import * as unitsModule from "../src/units.js";
import { ConversionError, convert, units } from "../src/units.js";

// The listed units of each kind, in their listed order.
const UNITS_BY_KIND = {
  length: ["mm", "cm", "m", "km", "in", "ft"],
  pressure: ["Pa", "kPa", "MPa", "bar", "psi"],
  temperature: ["C", "F", "K"],
};

// Two numbers are the same value when they differ by at most this fraction of
// the expected value. Zero has no tolerance, so only 0 and -0 equal 0.
const RELATIVE_TOLERANCE = 1e-12;

function isSameValue(actual, expected) {
  return (
    typeof actual === "number" &&
    Math.abs(actual - expected) <= RELATIVE_TOLERANCE * Math.abs(expected)
  );
}

function assertSameValue(actual, expected, label) {
  assert.ok(
    isSameValue(actual, expected),
    `${label}: expected ${expected}, got ${inspect(actual)}`,
  );
}

// Each row gives one quantity in some units of one kind. Converting between any
// two units of a row, a unit and itself included, must give the row's value in
// the target unit.
function assertAllPairs(rows) {
  for (const row of rows) {
    for (const [from, input] of Object.entries(row)) {
      for (const [to, expected] of Object.entries(row)) {
        assertSameValue(
          convert(input, from, to),
          expected,
          `convert(${input}, "${from}", "${to}")`,
        );
      }
    }
  }
}

function assertRejected(value, from, to) {
  assert.throws(
    () => convert(value, from, to),
    ConversionError,
    `convert(${inspect(value)}, ${inspect(from)}, ${inspect(to)}) must throw`,
  );
}

test("converts between all pairs of length units", () => {
  assertAllPairs([
    { mm: 304.8, cm: 30.48, m: 0.3048, km: 0.0003048, in: 12, ft: 1 },
    {
      mm: 1000000,
      cm: 100000,
      m: 1000,
      km: 1,
      in: 39370.07874015748,
      ft: 3280.839895013123,
    },
  ]);
});

test("converts between all pairs of pressure units", () => {
  assertAllPairs([
    {
      Pa: 6894.757293168,
      kPa: 6.894757293168,
      MPa: 0.006894757293168,
      bar: 0.06894757293168,
      psi: 1,
    },
    { Pa: 100000, kPa: 100, MPa: 0.1, bar: 1, psi: 14.503773773021682 },
  ]);
});

test("converts negative and zero lengths and pressures", () => {
  assertAllPairs([
    { mm: -457.2, cm: -45.72, m: -0.4572, km: -0.0004572, in: -18, ft: -1.5 },
    { mm: 0, cm: 0, m: 0, km: 0, in: 0, ft: 0 },
    {
      Pa: -13789.514586336,
      kPa: -13.789514586336,
      MPa: -0.013789514586336,
      bar: -0.13789514586336,
      psi: -2,
    },
    { Pa: 0, kPa: 0, MPa: 0, bar: 0, psi: 0 },
  ]);
});

test("converts between temperature units with their different origins", () => {
  assertAllPairs([
    { C: 0, F: 32, K: 273.15 },
    { C: 100, F: 212, K: 373.15 },
    { C: -40, F: -40, K: 233.15 },
    { C: 37, F: 98.6, K: 310.15 },
  ]);
});

// This quantity has a finite value in each unit listed but not in pascals, so
// a conversion that passes through pascals would answer an infinity.
test("converts a pressure that is out of range in pascals", () => {
  assertAllPairs([
    { kPa: 1e306, MPa: 1e303, bar: 1e304, psi: 1.4503773773021682e305 },
  ]);
});

// The Fahrenheit value is above a fifth and the Celsius and Kelvin values are
// above a ninth of the largest double, so a conversion that multiplies by 5 or
// by 9 before it divides would leave the range.
test("converts a large temperature in every unit", () => {
  assertAllPairs([
    { C: 5.555555555555556e307, F: 1e308, K: 5.555555555555556e307 },
  ]);
});

// A conversion to the same unit returns a value near the largest double as it
// is, in a unit of each kind.
test("returns a value unchanged when both units are the same", () => {
  const cases = [
    [1e308, "km"],
    [1e308, "MPa"],
    [1e308, "F"],
    [Number.MAX_VALUE, "C"],
  ];
  for (const [value, unit] of cases) {
    assert.equal(convert(value, unit, unit), value, `${value} ${unit}`);
  }
});

test("accepts absolute zero written in each temperature unit", () => {
  assertAllPairs([{ C: -273.15, F: -459.67, K: 0 }]);
  assertSameValue(convert(-0, "K", "C"), -273.15, 'convert(-0, "K", "C")');
  assertSameValue(convert(-0, "K", "K"), 0, 'convert(-0, "K", "K")');
  assert.doesNotThrow(() => convert(Number.MIN_VALUE, "K", "K"));
});

test("rejects a temperature below absolute zero in every unit", () => {
  // The first value of each unit is clearly below absolute zero, the second is
  // the closest number below it.
  const belowAbsoluteZero = {
    K: [-1, -Number.MIN_VALUE],
    C: [-273.16, -273.15000000000003],
    F: [-459.68, -459.67000000000007],
  };
  for (const [from, values] of Object.entries(belowAbsoluteZero)) {
    for (const value of values) {
      for (const to of UNITS_BY_KIND.temperature) {
        assertRejected(value, from, to);
      }
    }
  }
});

test("rejects a value that is not a finite number", () => {
  const values = [
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    "5",
    "",
    null,
    undefined,
    true,
    5n,
    [5],
    {},
    new Number(5),
  ];
  const unitPairs = [
    ["m", "cm"],
    ["m", "m"],
    ["Pa", "bar"],
    ["C", "K"],
    ["K", "K"],
  ];
  for (const value of values) {
    for (const [from, to] of unitPairs) {
      assertRejected(value, from, to);
    }
  }
});

test("rejects a conversion between units of different kinds", () => {
  const unitLists = Object.values(UNITS_BY_KIND);
  for (const sourceUnits of unitLists) {
    for (const targetUnits of unitLists) {
      if (sourceUnits === targetUnits) {
        continue;
      }
      for (const from of sourceUnits) {
        for (const to of targetUnits) {
          assertRejected(1, from, to);
        }
      }
    }
  }
});

test("rejects a unit that is not listed, in either position", () => {
  const unknownUnits = [
    // Listed symbols in another letter case.
    ...["M", "MM", "Mm", "CM", "KM", "Km", "IN", "FT"],
    ...["pa", "PA", "kpa", "KPa", "KPA", "mPa", "mpa", "MPA"],
    ...["Bar", "BAR", "PSI", "c", "f", "k"],
    // Symbols with spaces around or without any text.
    ...[" m", "m ", " ", ""],
    // Symbols that no list holds, a kind name among them.
    ...["x", "mile", "atm", "lbf/in2", "\u00b0C", "degC", "length"],
    // Names that every plain object has.
    ...["constructor", "toString", "hasOwnProperty", "__proto__"],
    // Values that are not text.
    null,
    undefined,
    1,
    ["m"],
    {},
  ];
  for (const unit of unknownUnits) {
    assertRejected(1, unit, "m");
    assertRejected(1, "m", unit);
    assertRejected(1, unit, unit);
  }
});

test("rejects a call with missing arguments", () => {
  assert.throws(() => convert(), ConversionError);
  assert.throws(() => convert(1), ConversionError);
  assert.throws(() => convert(1, "m"), ConversionError);
});

// The conversion is not specified for a result beyond the largest number: an
// infinity of the matching sign or a ConversionError are both acceptable, a
// finite number, NaN or another error is not.
test("answers a result that overflows with an infinity or a ConversionError", () => {
  const cases = [
    [Number.MAX_VALUE, "km", "mm", Number.POSITIVE_INFINITY],
    [Number.MAX_VALUE, "C", "F", Number.POSITIVE_INFINITY],
    [-Number.MAX_VALUE, "km", "mm", Number.NEGATIVE_INFINITY],
  ];
  for (const [value, from, to, infinity] of cases) {
    let outcome;
    try {
      outcome = convert(value, from, to);
    } catch (error) {
      outcome = error;
    }
    assert.ok(
      outcome === infinity || outcome instanceof ConversionError,
      `convert(${value}, "${from}", "${to}") gave ${inspect(outcome)}`,
    );
  }
});

test("lists the units of each kind in their listed order", () => {
  for (const [kind, listed] of Object.entries(UNITS_BY_KIND)) {
    assert.deepEqual(units(kind), listed);
  }
});

test("rejects a kind that is not listed", () => {
  const unknownKinds = [
    // Listed kinds in another letter case, other names and spacing.
    ...["Length", "LENGTH", "Pressure", "TEMPERATURE", "mass", ""],
    ...[" length", "length ", "m"],
    // Names that every plain object has.
    ...["constructor", "toString", "__proto__"],
    // Values that are not text.
    null,
    undefined,
    1,
    ["length"],
    {},
  ];
  for (const kind of unknownKinds) {
    assert.throws(
      () => units(kind),
      ConversionError,
      `units(${inspect(kind)}) must throw`,
    );
  }
  assert.throws(() => units(), ConversionError);
});

test("keeps its lists unchanged when a caller changes a returned list", () => {
  // A frozen list refuses a change, which protects the module as well, so a
  // refused change is not a failure. Each change gets its own attempt because
  // a list can refuse one change and accept the other.
  const attempt = (change) => {
    try {
      change();
    } catch (error) {
      assert.ok(error instanceof TypeError, "a refused change is a TypeError");
    }
  };
  for (const kind of Object.keys(UNITS_BY_KIND)) {
    const list = units(kind);
    attempt(() => list.push("x"));
    attempt(() => {
      list[0] = "x";
    });
  }
  for (const [kind, listed] of Object.entries(UNITS_BY_KIND)) {
    assert.deepEqual(units(kind), listed);
  }
  assertRejected(1, "x", "m");
});

test("throws a ConversionError that is also an Error with a text message", () => {
  for (const call of [() => convert(1, "x", "m"), () => units("x")]) {
    assert.throws(call, (error) => {
      assert.ok(error instanceof ConversionError, "is a ConversionError");
      assert.ok(error instanceof Error, "is an Error");
      assert.equal(typeof error.message, "string");
      return true;
    });
  }
  assert.ok(!(new Error("x") instanceof ConversionError));
});

test("keeps no state between calls, also after an error", () => {
  const convertSample = () => convert(1, "m", "cm");
  const first = convertSample();
  assertSameValue(first, 100, "first call");
  assertRejected(1, "x", "m");
  assert.equal(convertSample(), first);
  assert.equal(convertSample(), first);
});

test("exports exactly the conversion function, the list function and the error class", () => {
  assert.deepEqual(Object.keys(unitsModule).sort(), [
    "ConversionError",
    "convert",
    "units",
  ]);
});
