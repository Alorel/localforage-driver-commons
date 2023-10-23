/// <reference types="localforage" />

export {clone} from './clone';
export {getKeyPrefix} from './getKeyPrefix';
export {executeCallback} from './executeCallback';
export {getCallback} from './getCallback';
export type {CallbackFn} from './getCallback';
export {dropInstanceCommon} from './dropInstanceCommon';
export type {DropInstanceCommonOutput} from './dropInstanceCommon';
export {normaliseKey} from './normaliseKey';

export interface LocalForageExt extends LocalForage {

  /** @private */
  _defaultConfig: LocalForageOptions;
}
