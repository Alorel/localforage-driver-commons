import {getCallback} from './getCallback';
import {getKeyPrefix} from './getKeyPrefix';

/** Output of {@link dropInstanceCommon} */
export interface DropInstanceCommonOutput {
  callback: any;

  promise: Promise<string>;
}

/**
 * Common operation of localforage's dropInstance
 * @param options Operation options
 * @param callback Callback, if provided
 */
export function dropInstanceCommon(
  this: any,
  options: any,
  callback?: any //tslint:disable-line:no-ignored-initial-value
): DropInstanceCommonOutput {
  callback = getCallback.apply(this, <any>arguments);

  options = (typeof options !== 'function' && options) || {};
  if (!options.name) {
    const currentConfig = this.config();
    options.name = options.name || currentConfig.name;
    options.storeName = options.storeName || currentConfig.storeName;
  }

  let promise: Promise<string>;
  if (!options.name) {
    promise = Promise.reject('Invalid arguments');
  } else {
    promise = new Promise<string>(resolve => {
      if (!options.storeName) {
        resolve(`${options.name}/`);
      } else {
        resolve(getKeyPrefix(options, this._defaultConfig));
      }
    });
  }

  return {promise, callback};
}
