'use strict';

const Stone = require('_common/stone');

const frozenError = /object is not extensible/;

describe('Stone.Map', function () {
  describe('constructor', function () {
    it('returns a new empty Map object given no arguments', function () {
      const map = new Stone.Map();

      expect(map).to.eql({});
      expect(map).to.be.instanceOf(Stone.Map);
    });

    it('returns a new Map with the same keys as the given object', function () {
      const map = new Stone.Map({alf: 1, mork: 2});

      expect(map).to.eql({alf: 1, mork: 2});
      expect(map).to.be.instanceOf(Stone.Map);
    });

    it('returns nested immutable structures all the way down', function () {
      const map = new Stone.Map({alf: 1, mork: {and: 'mindy'}});

      expect(map).to.eql({alf: 1, mork: {and: 'mindy'}});
      expect(map.mork).to.be.instanceOf(Stone.Map);
      expect(function () { map.et = 'phone home'; }).to.throw(frozenError);
    });

    it('returns the same Map when nested within an object', function () {
      const mork = new Stone.Map({and: 'mindy'});
      const map = new Stone.Map({alf: 1, mork});

      expect(map).to.eql({alf: 1, mork: {and: 'mindy'}});
      expect(map.mork).to.eq(mork);
    });

    xit('handles circular references');
  });

  describe('getters', function () {
    it('retrieves a value by property access', function () {
      const map = new Stone.Map({alf: 1, mork: 2});

      expect(map.alf).to.eq(1);
      expect(map.mork).to.eq(2);
    });

    it('has enumerable keys', function () {
      const map = new Stone.Map({alf: 1, mork: 2});

      expect(Object.keys(map).sort()).to.eql(['alf', 'mork']);
    });

    xit('throws an error when accessing an arbitrary property', function () {
      const map = new Stone.Map({alf: 1, mork: 2});

      expect(function () { return map.et; }).to.throw(/undefined property et/);
    });
  });

  it('throws an error on direct property assignment', function () {
    const map = new Stone.Map();

    expect(function () { map.foo = 'bar'; }).to.throw(frozenError);
  });

  describe('#set', function () {
    it('throws an error given no arguments', function () {
      const map = new Stone.Map();

      expect(map.set).to.throw(/must pass key and value/);
    });

    it('returns the same object when values are unchanged', function () {
      const map = new Stone.Map({alf: 1, mork: 2});
      const newMap = map.set('alf', 1);

      expect(map).to.eq(newMap);
    });

    it('returns a new object when values are changed', function () {
      const map = new Stone.Map({alf: 1, mork: 2});
      const newMap = map.set('alf', 5);

      expect(map).not.to.eq(newMap);
      expect(newMap.alf).to.eq(5);
    });

    it('does not change values on original map', function () {
      const map = new Stone.Map({alf: 1, mork: 2});

      map.set('alf', 5);

      expect(map.alf).to.eq(1);
    });

    it('allows deeply setting values', function () {
      const map = new Stone.Map({alf: 1, mork: {and: 'mindy'}});
      const newMap = map.set(['mork', 'nanoo'], 'nanoo');

      expect(newMap).to.eql({alf: 1, mork: {and: 'mindy', nanoo: 'nanoo'}});
    });

    it('throws an error given an empty array as key', function () {
      const map = new Stone.Map({alf: 1, mork: {and: 'mindy'}});
      const invalidKeyError = /array key must have at least one element/;

      expect(function () { map.set([], 'nanoo'); }).to.throw(invalidKeyError);
    });
  });

  describe('#merge', function () {
    it('throws an error given no arguments', function () {
      const map = new Stone.Map();

      expect(map.merge).to.throw(/must pass an object with values/);
    });

    it('returns the same object when values are unchanged', function () {
      const map = new Stone.Map({alf: 1, mork: 2});
      const newMap = map.merge({alf: 1, mork: 2});

      expect(map).to.eq(newMap);
    });

    it('returns a new object when values are changed', function () {
      const map = new Stone.Map({alf: 1, mork: 2});
      const newMap = map.merge({alf: 5, et: 3});

      expect(map).not.to.eq(newMap);
      expect(newMap.alf).to.eq(5);
    });

    it('does not change values on original map', function () {
      const map = new Stone.Map({alf: 1, mork: 2});

      map.merge({alf: 5});

      expect(map.alf).to.eq(1);
    });
  });
});
