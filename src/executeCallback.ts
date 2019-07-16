/**
 * If provided, execute the callback when the promise resolves/rejects
 * @param promise The promise
 * @param callback The callback function
 */
export function executeCallback(promise: Promise<any>, callback?: any): void {
  if (callback) {
    promise.then(
      (result: any) => {
        callback(null, result);
      },
      (error: any) => {
        callback(error);
      }
    );
  }
}
