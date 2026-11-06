// Calculator screen: renders an expression and its result as one line of text.

import { CalculationError, evaluate } from "./engine.js";
import { formatNumber } from "./number-format.js";

// The width of the display in characters. renderScreen does not cut or wrap
// its line to this width.
export const SCREEN_WIDTH = 40;

/**
 * Renders an expression and its result as one line of text: the expression,
 * " = " and the result shown with formatNumber. An expression that evaluate
 * rejects with a CalculationError gives the error line "오류: " and the
 * reason instead, and an empty expression or one of spaces only gives an
 * empty text. The line is returned whole, whatever its length.
 *
 * @param {string} expression
 * @returns {string}
 * @throws {Error} Whatever evaluate throws other than a CalculationError.
 */
export function renderScreen(expression) {
  // Only U+0020 counts as a space, as it does for evaluate. A value that is
  // not a string is left to evaluate to reject.
  if (typeof expression === "string" && /^ *$/.test(expression)) {
    return "";
  }
  let value;
  try {
    value = evaluate(expression);
  } catch (error) {
    if (error instanceof CalculationError) {
      return `오류: ${error.message}`;
    }
    throw error;
  }
  return `${expression} = ${formatNumber(value)}`;
}
