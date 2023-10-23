/// <reference types="localforage" />

/**
 * Get the prefix for the given key
 * @param options Operation options
 * @param defaultConfig Default localforage config
 */
export function getKeyPrefix(options: LocalForageOptions, defaultConfig: LocalForageOptions): string {
  return `${options.name || defaultConfig.name}/${options.storeName || defaultConfig.storeName}/`;
}
