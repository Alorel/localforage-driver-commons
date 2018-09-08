import {bufferToString, deserialize, serialize, stringToBuffer} from './serialiser';

export {clone} from './clone';
export {getKeyPrefix} from './getKeyPrefix';
export {executeCallback} from './executeCallback';
export {LocalForageDbInstanceOptions, LocalForageOptions} from './types';

export const serialiser = {
  bufferToString,
  deserialize,
  serialize,
  stringToBuffer
};
