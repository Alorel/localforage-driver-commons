import {bufferToString, deserialize, serialize, stringToBuffer} from './serialiser';

export {clone} from './clone';
export * from './types';
export const serialiser = {
  bufferToString,
  deserialize,
  serialize,
  stringToBuffer
};
