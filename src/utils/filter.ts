export function filterObject<T>(obj: any, template: T): T {
  const result: any = {};
  for (const key in template) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
