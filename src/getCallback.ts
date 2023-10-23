/// <reference types="localforage" />

export interface CallbackFn<T> {
  (err: null | undefined | Error, value: T): void;
}


/**
 * Determine the callback argument from the list of arguments
 * @param args Arguments to use
 * @return Callback function or void
 */
export function getCallback<T>(args: any[]): CallbackFn<T> | undefined {
  if (args.length && typeof args[args.length - 1] === 'function') {
    return args[args.length - 1];
  }
}
