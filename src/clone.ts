export function clone<T>(obj: T): T {
  if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj) {
    return obj;
  }

  const temp: any = obj instanceof Date ? new Date(<any>obj) : (obj.constructor());

  for (const key of Object.keys(obj)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj['isActiveClone'] = null;
      temp[key] = clone(obj[key]);
      delete obj['isActiveClone'];
    }
  }

  return temp;
}
