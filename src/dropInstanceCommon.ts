/// <reference types="localforage" />

import {type CallbackFn, getCallback} from './getCallback';
import {getKeyPrefix} from './getKeyPrefix';
import type {LocalForageExt} from './index';

/** Output of {@link dropInstanceCommon} */
export interface DropInstanceCommonOutput {
  callback?: CallbackFn<string>;

  promise: Promise<string>;
}

/**
 * Common operation of localforage's dropInstance
 * @param args `dropInstance` arguments
 */
export function dropInstanceCommon(
  this: LocalForage,
  ...args: Parameters<LocalForageDropInstanceFn>
): DropInstanceCommonOutput {
  const resolvedCallback = getCallback(args);
  const options: LocalForageDbInstanceOptions = args[0] ?? {};

  if (!options.name) {
    const currentConfig = this.config();
    options.name = options.name || currentConfig.name;
    options.storeName = options.storeName || currentConfig.storeName;
  }

  return {
    callback: resolvedCallback,
    promise: options.name
      ? new Promise<string>(resolve => {
        if (options.storeName) {
          resolve(getKeyPrefix(options, (this as LocalForageExt)._defaultConfig));
        } else {
          resolve(`${options.name}/`);
        }
      })
      : Promise.reject(new Error('Invalid arguments'))
  };
}
