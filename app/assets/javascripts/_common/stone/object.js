'use strict';

// const StoneError = require('./error');
const getType = require('./get_type');

function deepSet(object, key, value) {
  if (key.length === 0) {
    throw new TypeError('array key must have at least one element');
  }

  const topKey = key[0];
  const rest = key.slice(1);

  if (rest.length === 0) { return object.set(topKey, value); }

  return object.set(topKey, object[topKey].set(rest, value));
}

module.exports = function StoneObject(source) {
  const that = this;
  const sourceType = getType(source);

  if (sourceType !== 'Object') {
    const message = `must be initialized with an object, got ${sourceType}`;

    throw new TypeError(message);
  }

  Object.keys(source).forEach(function assignKey(key) {
    const value = source[key];

    if (value instanceof StoneObject) {
      that[key] = value;
    } else if (typeof value === 'object') {
      that[key] = new StoneObject(value);
    } else {
      that[key] = value;
    }
  });

  function set(key, value) {
    if (arguments.length !== 2) {
      throw new TypeError('must pass key and value');
    }

    if (Array.isArray(key)) { return deepSet(that, key, value); }
    if (that[key] === value) { return that; }

    const newObj = Object.assign({}, that);

    newObj[key] = value;

    return new StoneObject(newObj);
  }

  function merge(newSource) {
    if (arguments.length !== 1) {
      throw new TypeError('must pass an object with values');
    }

    const valuesDiffer = Object.keys(newSource).find(
      (key) => that[key] !== newSource[key]
    );

    if (!valuesDiffer) { return that; }

    const newObj = Object.assign({}, that, newSource);

    return new StoneObject(newObj);
  }

  Object.defineProperty(that, 'set', {value: set});
  Object.defineProperty(that, 'merge', {value: merge});
  Object.freeze(that);
};
