'use strict';

import getType from 'js/_common/stone/get_type';

describe('getType', () => {
  it('returns "Number" given a number', () => {
    expect(getType(5)).toBe('Number');
    expect(getType(5.0)).toBe('Number');
    expect(getType(-5)).toBe('Number');
  });

  it('returns "String" given a string', () => {
    expect(getType('Jebus')).toBe('String');
  });

  it('returns "Object" given an object', () => {
    expect(getType({})).toBe('Object');
    expect(getType({alien: 'nation'})).toBe('Object');
  });

  it('returns "Array" given an array', () => {
    expect(getType([])).toBe('Array');
    expect(getType([1, 2, 3])).toBe('Array');
  });

  it('returns "Null" given null', () => {
    expect(getType(null)).toBe('Null');
  });

  it('returns "Undefined" given undefined', () => {
    expect(getType()).toBe('Undefined');
  });

  it('returns "Function" given a function', () => {
    expect(getType(() => 'goobers')).toBe('Function');
  });
});
