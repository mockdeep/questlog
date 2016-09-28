'use strict';

const getType = require('./get_type');

function List(source) {
  const sourceType = getType(source);

  if (sourceType !== 'Array' && !(source instanceof List)) {
    const message = `must be initialized with an array, got ${sourceType}`;

    throw new TypeError(message);
  }

  const list = source.map(function mapValue(value) {
    if (value instanceof List) {
      return value;
    } else if (getType(value) === 'Array') {
      return new List(value);
    }

    return value;
  });

  // eslint-disable-next-line no-proto
  list.__proto__ = List.prototype;
  Object.freeze(list);

  return list;
}

module.exports = List;
