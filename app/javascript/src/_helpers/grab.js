function grab(object, key) {
  if (!Object.prototype.hasOwnProperty.call(object, key)) {
    throw new Error(`object has no key "${key}". <${JSON.stringify(object)}>`);
  }

  return object[key];
}

export default grab;
