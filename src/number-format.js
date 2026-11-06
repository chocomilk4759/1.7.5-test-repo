// Display rules for calculator results.

const DEFAULT_SIGNIFICANT_DIGITS = 12;

/**
 * Format a number for display with at most the given significant digits.
 * Trailing zeros after the decimal point are dropped, and negative zero prints as "0".
 */
export function formatNumber(value, significantDigits = DEFAULT_SIGNIFICANT_DIGITS) {
  if (!Number.isFinite(value)) {
    throw new RangeError(`Cannot format a non-finite number: ${value}`);
  }
  if (value === 0) {
    return "0";
  }
  return String(Number(value.toPrecision(significantDigits)));
}
