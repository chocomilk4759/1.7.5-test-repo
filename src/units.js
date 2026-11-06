// Unit conversion: converts values between units of the same kind.

/**
 * Thrown when a value, a unit or a kind cannot be converted or listed.
 */
export class ConversionError extends Error {}

// The size of each unit in meters or in pascals. The entries are in the order
// in which `units` lists the units of their kind.
const METERS_PER_UNIT = [
  ["mm", 0.001],
  ["cm", 0.01],
  ["m", 1],
  ["km", 1000],
  ["in", 0.0254],
  ["ft", 0.3048],
];
const PASCALS_PER_UNIT = [
  ["Pa", 1],
  ["kPa", 1000],
  ["MPa", 1000000],
  ["bar", 100000],
  ["psi", 6894.757293168],
];

// Nine Fahrenheit degrees span the same difference as five Celsius degrees. A
// conversion multiplies by one span before it divides by the other: rounding
// the quotient 5 / 9 first would turn -459.67 F into a Kelvin value just below
// zero.
const FAHRENHEIT_SPAN = 9;
const CELSIUS_SPAN = 5;
const FAHRENHEIT_AT_ZERO_CELSIUS = 32;
const KELVIN_AT_ZERO_CELSIUS = 273.15;

// Absolute zero in each temperature unit. Each is a constant of its own and
// not converted from another one, because a converted value can land a
// rounding error away from the limit and reject absolute zero itself.
const ABSOLUTE_ZERO_CELSIUS = -KELVIN_AT_ZERO_CELSIUS;
const ABSOLUTE_ZERO_FAHRENHEIT = -459.67;
const ABSOLUTE_ZERO_KELVIN = 0;

// Units of one kind that are a fixed multiple of its reference unit.
function scaledUnits(kind, sizes) {
  return sizes.map(([symbol, size]) => [
    symbol,
    {
      kind,
      minimum: Number.NEGATIVE_INFINITY,
      toReference: (value) => value * size,
      fromReference: (reference) => reference / size,
    },
  ]);
}

function temperature(minimum, toCelsius, fromCelsius) {
  return {
    kind: "temperature",
    minimum,
    toReference: toCelsius,
    fromReference: fromCelsius,
  };
}

// Every unit has a kind, the lowest value it accepts, and the functions that
// convert a value to and from the reference unit of its kind: the meter, the
// pascal and the degree Celsius. The order of the entries within a kind is the
// order in which `units` lists them.
const UNITS = new Map([
  ...scaledUnits("length", METERS_PER_UNIT),
  ...scaledUnits("pressure", PASCALS_PER_UNIT),
  [
    "C",
    temperature(
      ABSOLUTE_ZERO_CELSIUS,
      (value) => value,
      (celsius) => celsius,
    ),
  ],
  [
    "F",
    temperature(
      ABSOLUTE_ZERO_FAHRENHEIT,
      (value) =>
        ((value - FAHRENHEIT_AT_ZERO_CELSIUS) * CELSIUS_SPAN) / FAHRENHEIT_SPAN,
      (celsius) =>
        (celsius * FAHRENHEIT_SPAN) / CELSIUS_SPAN + FAHRENHEIT_AT_ZERO_CELSIUS,
    ),
  ],
  [
    "K",
    temperature(
      ABSOLUTE_ZERO_KELVIN,
      (value) => value - KELVIN_AT_ZERO_CELSIUS,
      (celsius) => celsius + KELVIN_AT_ZERO_CELSIUS,
    ),
  ],
]);

function findUnit(symbol) {
  const unit = UNITS.get(symbol);
  if (unit === undefined) {
    throw new ConversionError("unknown unit");
  }
  return unit;
}

/**
 * Converts a value from one unit to another unit of the same kind. The result
 * is the unrounded double-precision value; a result beyond the range of a
 * double is an infinity.
 *
 * @param {number} value A finite number; for a temperature, not below
 *   absolute zero in its unit.
 * @param {string} from Symbol of the unit of `value`, as `units` lists it.
 * @param {string} to Symbol of the unit of the result.
 * @returns {number}
 * @throws {ConversionError} When `value` is not a finite number, a symbol is
 *   not listed (letter case counts), the units are of different kinds, or a
 *   temperature is below absolute zero.
 */
export function convert(value, from, to) {
  if (!Number.isFinite(value)) {
    throw new ConversionError("value must be a finite number");
  }
  const source = findUnit(from);
  const target = findUnit(to);
  if (source.kind !== target.kind) {
    throw new ConversionError("units are of different kinds");
  }
  if (value < source.minimum) {
    throw new ConversionError("value is below absolute zero");
  }
  if (source === target) {
    return value;
  }
  return target.fromReference(source.toReference(value));
}

/**
 * Lists the unit symbols of a kind: `length`, `pressure` or `temperature`.
 * Each call returns a new array.
 *
 * @param {string} kind
 * @returns {string[]}
 * @throws {ConversionError} When the kind is not listed.
 */
export function units(kind) {
  const symbols = [...UNITS]
    .filter(([, unit]) => unit.kind === kind)
    .map(([symbol]) => symbol);
  if (symbols.length === 0) {
    throw new ConversionError("unknown kind");
  }
  return symbols;
}
