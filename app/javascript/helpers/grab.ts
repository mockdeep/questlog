type Key = string | number;
function grab<T>(object: T[], key: number): T;
function grab<T>(object: { [key: Key]: T }, key: Key): T;
function grab<T>(object: { [key: Key]: T }, key: Key): T {
  const value = object[key];
  if (value !== undefined) { return value; }

  throw new Error(`object has no key "${key}". <${JSON.stringify(object)}>`);
}

export {grab};
