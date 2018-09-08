import {LocalForageOptions} from './types';

export function getKeyPrefix(options: LocalForageOptions, defaultConfig: LocalForageOptions): string {
  let keyPrefix = `${options.name}/`;

  if (options.storeName !== defaultConfig.storeName) {
    keyPrefix += `${options.storeName}/`;
  }

  return keyPrefix;
}
