/// <reference types="localforage" />

const IS_ACTIVE_CLONE: unique symbol = Symbol('Is active clone');

/** Clone an object */
export function clone<T>(obj: T): T {
  if (obj == null || typeof obj !== 'object' || IS_ACTIVE_CLONE in obj) {
    return obj;
  }

  const temp: any = obj instanceof Date
    ? new Date(obj)
    : ((obj as any).constructor());

  for (const [key, value] of Object.entries(obj)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      Object.defineProperty(obj, IS_ACTIVE_CLONE, {configurable: true, value: true});
      temp[key] = clone(value);

      delete (obj as any)[IS_ACTIVE_CLONE];
    }
  }

  return temp;
}
