'use strict';

const getType = require('./get_type');

function StoneArray(source) {
  const sourceType = getType(source);

  if (sourceType !== 'Array' && !(source instanceof StoneArray)) {
    const message = `must be initialized with an array, got ${sourceType}`;

    throw new TypeError(message);
  }

  const array = source.map(function mapValue(value) {
    if (value instanceof StoneArray) {
      return value;
    } else if (getType(value) === 'Array') {
      return new StoneArray(value);
    }

    return value;
  });

  Object.setPrototypeOf(array, StoneArray.prototype);
  Object.freeze(array);

  return array;
}

StoneArray.prototype = Array.prototype;

module.exports = StoneArray;
