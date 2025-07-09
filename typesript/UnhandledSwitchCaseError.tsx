/**
 * @class UnhandledSwitchCaseError
 * @description
 * Custom error used in exhaustive switch statements to catch unhandled cases at runtime,
 * and—crucially—enable TypeScript to enforce exhaustive checks at compile-time using the `never` type.
 *
 * When you pass a value of type `never` (meaning all possible cases were handled),
 * the compiler ensures you never forget a case. If a case is missing, TypeScript will throw a type error here,
 * forcing you to handle it explicitly.
 *
 * @example
 * // --- Correct usage: all cases handled, so no TypeScript error ---
 * type Status = 'active' | 'inactive';
 * function handleStatus(status: Status) {
 *   switch (status) {
 *     case 'active': return 'ON';
 *     case 'inactive': return 'OFF';
 *     default:
 *       // 'status' is of type 'never' here — all cases handled above
 *       throw new UnhandledSwitchCaseError(status);
 *   }
 * }
 *
 * @example
 * // --- Incorrect usage: missing a case, TypeScript will error ---
 * type Status = 'active' | 'inactive' | 'pending';
 * function handleStatus(status: Status) {
 *   switch (status) {
 *     case 'active': return 'ON';
 *     case 'inactive': return 'OFF';
 *     default:
 *       // 'status' is still 'pending' here, not 'never'!
 *       // Passing 'status' to UnhandledSwitchCaseError will cause a TS error,
 *       // forcing you to explicitly handle 'pending' or adjust your code.
 *       throw new UnhandledSwitchCaseError(status);
 *   }
 * }
 *
 * @param val {never} - The value that should never occur (only if all cases are handled).
 */
export default class UnhandledSwitchCaseError extends Error {
  constructor(val: never) {
    super(`Unhandled switch case: ${JSON.stringify(val)}`);
  }
}
