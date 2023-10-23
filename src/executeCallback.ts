/// <reference types="localforage" />

import type {CallbackFn} from './getCallback';

/**
 * If provided, execute the callback when the promise resolves/rejects
 * @param promise The promise
 * @param callback The callback function
 */
export function executeCallback<T>(promise: Promise<T>, callback?: CallbackFn<T>): void {
  if (callback) {
    promise.then(
      result => {
        callback(null, result);
      },
      error => {
        callback(error, null as any);
      }
    );
  }
}
