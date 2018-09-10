import {LocalForageOptions} from './types';

export function getKeyPrefix(options: LocalForageOptions, defaultConfig: LocalForageOptions): string {
  return `${options.name || defaultConfig.name}/${options.storeName || defaultConfig.storeName}`;
}
