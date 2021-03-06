import {createBlob} from './createBlob';

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.

const enum Consts {
  BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  BLOB_TYPE_PREFIX = '~~local_forage_type~',
  SERIALIZED_MARKER = '__lfsc__:',
  TYPE_ARRAYBUFFER = 'arbf',
  TYPE_BLOB = 'blob',
  TYPE_INT8ARRAY = 'si08',
  TYPE_UINT8ARRAY = 'ui08',
  TYPE_UINT8CLAMPEDARRAY = 'uic8',
  TYPE_INT16ARRAY = 'si16',
  TYPE_INT32ARRAY = 'si32',
  TYPE_UINT16ARRAY = 'ur16',
  TYPE_UINT32ARRAY = 'ui32',
  TYPE_FLOAT32ARRAY = 'fl32',
  TYPE_FLOAT64ARRAY = 'fl64'
}

const BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
const SERIALIZED_MARKER_LENGTH = Consts.SERIALIZED_MARKER.length;
const TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + Consts.TYPE_ARRAYBUFFER.length;

//tslint:disable:no-magic-numbers no-bitwise prefer-switch no-unbound-method

const toString = Object.prototype.toString;

export function stringToBuffer(serializedString: string): ArrayBuffer {
  // Fill the string into a ArrayBuffer.
  let bufferLength = serializedString.length * 0.75;
  const len = serializedString.length;

  if (serializedString[serializedString.length - 1] === '=') {
    bufferLength--;
    if (serializedString[serializedString.length - 2] === '=') {
      bufferLength--;
    }
  }

  const buffer = new ArrayBuffer(bufferLength);
  const bytes = new Uint8Array(buffer);

  for (let i = 0, p = 0; i < len; i += 4) {
    const encoded1 = Consts.BASE_CHARS.indexOf(serializedString[i]);
    const encoded2 = Consts.BASE_CHARS.indexOf(serializedString[i + 1]);
    const encoded3 = Consts.BASE_CHARS.indexOf(serializedString[i + 2]);
    const encoded4 = Consts.BASE_CHARS.indexOf(serializedString[i + 3]);

    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }

  return buffer;
}

/**
 * Converts a buffer to a string to store, serialized, in the backend
 * storage library.
 */
export function bufferToString(buffer: ArrayBufferLike): string {
  // base64-arraybuffer
  const bytes = new Uint8Array(buffer);
  let base64String = '';

  for (let i = 0; i < bytes.length; i += 3) {
    /*jslint bitwise: true */
    base64String += Consts.BASE_CHARS[bytes[i] >> 2];
    base64String += Consts.BASE_CHARS[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64String +=
      Consts.BASE_CHARS[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64String += Consts.BASE_CHARS[bytes[i + 2] & 63];
  }

  if (bytes.length % 3 === 2) {
    base64String = base64String.substring(0, base64String.length - 1) + '=';
  } else if (bytes.length % 3 === 1) {
    base64String = base64String.substring(0, base64String.length - 2) + '==';
  }

  return base64String;
}

/**
 * Serialize a value, afterwards executing a callback (which usually
 * instructs the `setItem()` callback/promise to be executed). This is how
 * we store binary data with localStorage.
 * @param value
 * @param callback
 */

export function serialize(this: any, value: any, callback: any): void {
  let valueType = '';

  if (value) {
    valueType = toString.call(value);
  }

  // Cannot use `value instanceof ArrayBuffer` or such here, as these
  // checks fail when running the tests using casper.js...
  if (value && (valueType === '[object ArrayBuffer]' ||
    (value.buffer && toString.call(value.buffer) === '[object ArrayBuffer]'))) {
    // Convert binary arrays to a string and prefix the string with
    // a special marker.
    let buffer: ArrayBufferLike;
    let marker: string = Consts.SERIALIZED_MARKER;

    if (value instanceof ArrayBuffer) {
      buffer = value;
      marker += Consts.TYPE_ARRAYBUFFER;
    } else {
      buffer = value.buffer;

      if (valueType === '[object Int8Array]') {
        marker += Consts.TYPE_INT8ARRAY;
      } else if (valueType === '[object Uint8Array]') {
        marker += Consts.TYPE_UINT8ARRAY;
      } else if (valueType === '[object Uint8ClampedArray]') {
        marker += Consts.TYPE_UINT8CLAMPEDARRAY;
      } else if (valueType === '[object Int16Array]') {
        marker += Consts.TYPE_INT16ARRAY;
      } else if (valueType === '[object Uint16Array]') {
        marker += Consts.TYPE_UINT16ARRAY;
      } else if (valueType === '[object Int32Array]') {
        marker += Consts.TYPE_INT32ARRAY;
      } else if (valueType === '[object Uint32Array]') {
        marker += Consts.TYPE_UINT32ARRAY;
      } else if (valueType === '[object Float32Array]') {
        marker += Consts.TYPE_FLOAT32ARRAY;
      } else if (valueType === '[object Float64Array]') {
        marker += Consts.TYPE_FLOAT64ARRAY;
      } else {
        callback(new Error('Failed to get type for BinaryArray'));
      }
    }

    callback(marker + bufferToString(buffer));
  } else if (valueType === '[object Blob]') {
    // Convert the blob to a binaryArray and then to a string.
    const fileReader = new FileReader();

    fileReader.onload = function () {
      // Backwards-compatible prefix for the blob type.
      //tslint:disable-next-line:restrict-plus-operands
      const str = `${Consts.BLOB_TYPE_PREFIX + value.type}~${bufferToString(<ArrayBufferLike>this.result)}`;

      callback(Consts.SERIALIZED_MARKER + Consts.TYPE_BLOB + str);
    };

    fileReader.readAsArrayBuffer(value);
  } else {
    try {
      callback(JSON.stringify(value));
    } catch (e) {
      console.error('Couldn\'t convert value into a JSON string: ', value);

      callback(null, e);
    }
  }
}

/**
 * Deserialize data we've inserted into a value column/field. We place
 * special markers into our strings to mark them as encoded; this isn't
 * as nice as a meta field, but it's the only sane thing we can do whilst
 * keeping localStorage support intact.
 *
 * Oftentimes this will just deserialize JSON content, but if we have a
 * special marker (SERIALIZED_MARKER, defined above), we will extract
 * some kind of arraybuffer/binary data/typed array out of the string.
 * @param value
 */
export function deserialize(value: string): any {
  // If we haven't marked this string as being specially serialized (i.e.
  // something other than serialized JSON), we can just return it and be
  // done with it.
  if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== Consts.SERIALIZED_MARKER) {
    return JSON.parse(value);
  }

  // The following code deals with deserializing some kind of Blob or
  // TypedArray. First we separate out the type of data we're dealing
  // with from the data itself.
  let serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
  const type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

  let blobType: any;
  // Backwards-compatible blob type serialization strategy.
  // DBs created with older versions of localForage will simply not have the blob type.
  if (type === Consts.TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
    const matcher = <RegExpMatchArray>serializedString.match(BLOB_TYPE_PREFIX_REGEX);
    blobType = matcher[1];
    serializedString = serializedString.substring(matcher[0].length);
  }
  const buffer = stringToBuffer(serializedString);

  // Return the right type based on the code/type set during
  // serialization.
  switch (type) {
    case Consts.TYPE_ARRAYBUFFER:
      return buffer;
    case Consts.TYPE_BLOB:
      return createBlob([buffer], {type: blobType});
    case Consts.TYPE_INT8ARRAY:
      return new Int8Array(buffer);
    case Consts.TYPE_UINT8ARRAY:
      return new Uint8Array(buffer);
    case Consts.TYPE_UINT8CLAMPEDARRAY:
      return new Uint8ClampedArray(buffer);
    case Consts.TYPE_INT16ARRAY:
      return new Int16Array(buffer);
    case Consts.TYPE_UINT16ARRAY:
      return new Uint16Array(buffer);
    case Consts.TYPE_INT32ARRAY:
      return new Int32Array(buffer);
    case Consts.TYPE_UINT32ARRAY:
      return new Uint32Array(buffer);
    case Consts.TYPE_FLOAT32ARRAY:
      return new Float32Array(buffer);
    case Consts.TYPE_FLOAT64ARRAY:
      return new Float64Array(buffer);
    default:
      throw new Error('Unkown type: ' + type);
  }
}
