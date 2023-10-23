/// <reference types="localforage" />

/* eslint-disable */

declare const BlobBuilder: any;
declare const MozBlobBuilder: any;
declare const WebKitBlobBuilder: any;
declare const MSBlobBuilder: any;

/**
 * Abstracts constructing a Blob object, so it also works in older
 * browsers that don't support the native Blob constructor. (i.e.
 * old QtWebKit versions, at least).
 * Abstracts constructing a Blob object, so it also works in older
 * browsers that don't support the native Blob constructor. (i.e.
 * old QtWebKit versions, at least).
 *
 * @param parts
 * @param properties
 */
export function createBlob(parts: any, properties: any): Blob {
  parts = parts || [];
  properties = properties || {};
  try {
    return new Blob(parts, properties);
  } catch (e) {
    if (e.name !== 'TypeError') {
      throw e;
    }

    const Builder: any = typeof BlobBuilder !== 'undefined'
      ? BlobBuilder
      : typeof MSBlobBuilder !== 'undefined'
        ? MSBlobBuilder
        : typeof MozBlobBuilder !== 'undefined'
          ? MozBlobBuilder
          : WebKitBlobBuilder;

    const builder = new Builder();
    for (let i = 0; i < parts.length; i += 1) {
      builder.append(parts[i]);
    }

    return builder.getBlob(properties.type);
  }
}
