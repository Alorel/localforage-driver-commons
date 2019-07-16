/**
 * Determine the callback argument from the list of arguments
 * @param _args Arguments to use
 * @return Callback function or void
 */
export function getCallback(..._args: any[]): any {
  if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
    return arguments[arguments.length - 1];
  }
}
