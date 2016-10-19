'use strict';

import getType from '_common/stone/get_type';

describe('getType', function () {
  it('returns "Number" given a number', function () {
    expect(getType(5)).to.eq('Number');
    expect(getType(5.0)).to.eq('Number');
    expect(getType(-5)).to.eq('Number');
  });

  it('returns "String" given a string', function () {
    expect(getType('Jebus')).to.eq('String');
  });

  it('returns "Object" given an object', function () {
    expect(getType({})).to.eq('Object');
    expect(getType({alien: 'nation'})).to.eq('Object');
  });

  it('returns "Array" given an array', function () {
    expect(getType([])).to.eq('Array');
    expect(getType([1, 2, 3])).to.eq('Array');
  });

  it('returns "Null" given null', function () {
    expect(getType(null)).to.eq('Null');
  });

  it('returns "Undefined" given undefined', function () {
    expect(getType()).to.eq('Undefined');
  });

  it('returns "Function" given a function', function () {
    expect(getType(function () { return 'goobers'; })).to.eq('Function');
  });
});
