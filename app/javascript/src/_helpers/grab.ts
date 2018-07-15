function grab(object, key) {
  if (object.hasOwnProperty(key)) { return object[key]; }

  throw new Error(`object has no key "${key}". <${JSON.stringify(object)}>`);
}

export default grab;
