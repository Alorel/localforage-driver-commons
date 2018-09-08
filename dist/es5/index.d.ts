import { bufferToString, deserialize, serialize, stringToBuffer } from './serialiser';
export { clone } from './clone';
export * from './types';
export declare const serialiser: {
    bufferToString: typeof bufferToString;
    deserialize: typeof deserialize;
    serialize: typeof serialize;
    stringToBuffer: typeof stringToBuffer;
};
