function assert<T>(value: T | null | undefined): T {
  if (value === null || typeof value === 'undefined') {
    throw new Error('value is null or undefined');
  }

  return value;
}

export {assert};
