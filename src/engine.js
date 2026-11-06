// Calculation engine: evaluates arithmetic expressions by direct parsing.

/**
 * Thrown when an expression cannot be evaluated. The message states the reason
 * and the 0-based character position of the problem in the original expression.
 */
export class CalculationError extends Error {}

function calculationErrorAt(reason, position, options) {
  return new CalculationError(`${reason} at position ${position}`, options);
}

function isDigit(character) {
  return character >= "0" && character <= "9";
}

// Recursive-descent parser that evaluates while it reads. One instance holds
// the only state of one evaluate call.
//
//   expression = term { ("+" | "-") term }
//   term       = factor { ("*" | "/") factor }
//   factor     = "-" factor | number | "(" expression ")"
//   number     = digit { digit } [ "." digit { digit } ]
//
// Only U+0020 counts as a space. Spaces are skipped around tokens, never
// inside a number.
class Parser {
  constructor(source) {
    this.source = source;
    this.position = 0;
  }

  get current() {
    return this.source[this.position];
  }

  fail(reason, position) {
    throw calculationErrorAt(reason, position);
  }

  // Rejects what stands at the cursor: the end of the input, or a character
  // the grammar does not allow at this place.
  failAtCursor() {
    this.fail(
      this.position >= this.source.length
        ? "unexpected end of expression"
        : "unexpected character",
      this.position,
    );
  }

  // An intermediate value that is not finite is rejected where it appears,
  // because a later operation could turn it into a plausible result, such as
  // dividing 1 by a product that overflowed.
  checkFinite(value, position) {
    if (!Number.isFinite(value)) {
      this.fail("result out of range", position);
    }
    return value;
  }

  skipSpaces() {
    while (this.current === " ") {
      this.position += 1;
    }
  }

  skipDigits() {
    while (isDigit(this.current)) {
      this.position += 1;
    }
  }

  // Reads the whole input and rejects whatever follows the expression.
  parseAll() {
    const value = this.parseExpression();
    if (this.position < this.source.length) {
      this.failAtCursor();
    }
    return value;
  }

  // parseExpression and parseTerm return with the spaces after them skipped,
  // so the next token is at the cursor.
  parseExpression() {
    let value = this.parseTerm();
    while (this.current === "+" || this.current === "-") {
      const operator = this.current;
      const operatorPosition = this.position;
      this.position += 1;
      const right = this.parseTerm();
      value = this.checkFinite(
        operator === "+" ? value + right : value - right,
        operatorPosition,
      );
    }
    return value;
  }

  parseTerm() {
    let value = this.parseFactor();
    this.skipSpaces();
    while (this.current === "*" || this.current === "/") {
      const operator = this.current;
      const operatorPosition = this.position;
      this.position += 1;
      const right = this.parseFactor();
      // Also matches a divisor that is negative zero.
      if (operator === "/" && right === 0) {
        this.fail("division by zero", operatorPosition);
      }
      value = this.checkFinite(
        operator === "*" ? value * right : value / right,
        operatorPosition,
      );
      this.skipSpaces();
    }
    return value;
  }

  parseFactor() {
    this.skipSpaces();
    if (this.current === "-") {
      this.position += 1;
      return -this.parseFactor();
    }
    if (this.current === "(") {
      const openPosition = this.position;
      this.position += 1;
      const value = this.parseExpression();
      if (this.position >= this.source.length) {
        this.fail("unclosed parenthesis", openPosition);
      }
      if (this.current !== ")") {
        this.failAtCursor();
      }
      this.position += 1;
      return value;
    }
    return this.parseNumber();
  }

  // Number() accepts text the grammar does not, such as "" (0) and "0x55"
  // (85), so it only converts text that the digit scan has already checked.
  parseNumber() {
    const start = this.position;
    this.skipDigits();
    if (this.position === start) {
      this.failAtCursor();
    }
    if (this.current === "." && isDigit(this.source[this.position + 1])) {
      this.position += 1;
      this.skipDigits();
    }
    const value = Number(this.source.slice(start, this.position));
    if (!Number.isFinite(value)) {
      this.fail("number out of range", start);
    }
    return value;
  }
}

/**
 * Evaluates an expression of numbers, `+ - * /`, parentheses and unary minus.
 * Multiplication and division bind tighter than addition and subtraction, and
 * operators of equal precedence are applied from the left. The result is the
 * unrounded double-precision value.
 *
 * @param {string} expression
 * @returns {number}
 * @throws {CalculationError} For a syntax error, a division by zero, a number
 *   or intermediate result that is not finite, or an expression nested so
 *   deeply that the parser runs out of call stack. The error of the last case
 *   names the start of the expression, and its cause is the overflow.
 * @throws {TypeError} When the argument is not a string.
 */
export function evaluate(expression) {
  if (typeof expression !== "string") {
    throw new TypeError("expression must be a string");
  }
  try {
    return new Parser(expression).parseAll();
  } catch (error) {
    if (error instanceof RangeError) {
      // The recursion outgrew the call stack. The position is the start of the
      // expression: the cursor at the overflow depends on how much of the
      // stack was already in use, so it would differ between calls.
      throw calculationErrorAt("expression nested too deeply", 0, {
        cause: error,
      });
    }
    throw error;
  }
}
