import {getCallback} from './getCallback';
import {getKeyPrefix} from './getKeyPrefix';

export interface DropInstanceCommonOutput {
  callback: any;

  promise: Promise<string>;
}

//tslint:disable-next-line:no-ignored-initial-value
export function dropInstanceCommon(this: any, options: any, callback?: any): DropInstanceCommonOutput {
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
