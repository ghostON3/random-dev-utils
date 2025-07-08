export default class UnhandledSwitchCaseError extends Error {
  constructor(val: never) {
    super(`Unhandled switch case: ${JSON.stringify(val)}`);
  }
}
