function grab<T>(object: { [key: string | number]: T }, key: string | number) {
  if (object.hasOwnProperty(key)) { return object[key]; }

  throw new Error(`object has no key "${key}". <${JSON.stringify(object)}>`);
}

export {grab};
