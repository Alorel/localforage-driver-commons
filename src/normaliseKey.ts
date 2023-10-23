/// <reference types="localforage" />

/**
 * Normalise the given key into a string
 * @param key Key to normalise
 */
export function normaliseKey(key: any): string {
  // Cast the key to a string, as that's all we can set as a key.
  if (typeof key === 'string') {
    return key;
  }

  console.warn(key, 'used as a key, but it is not a string.');

  return String(key);
}
