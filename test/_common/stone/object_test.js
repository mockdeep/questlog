'use strict';

const StoneObject = require('_common/stone').StoneObject;

const frozenError = /object is not extensible/;

describe('StoneObject', function () {
  describe('constructor', function () {
    it('throws an error given no arguments', function () {
      const message = /must be initialized with an object/;

      expect(function () { return new StoneObject(); }).to.throw(message);
    });

    it('throws an error when first argument is not an object', function () {
      const message = /must be initialized with an object/;

      expect(function () { return new StoneObject('foo'); }).to.throw(message);
      expect(function () { return new StoneObject([]); }).to.throw(message);
    });

    it('returns a new empty StoneObject', function () {
      const object = new StoneObject({});

      expect(object).to.eql({});
      expect(object).to.be.instanceOf(StoneObject);
    });

    it('returns a new StoneObject with the same keys as the given object', function () {
      const object = new StoneObject({alf: 1, mork: 2});

      expect(object).to.eql({alf: 1, mork: 2});
      expect(object).to.be.instanceOf(StoneObject);
    });

    it('returns nested immutable structures all the way down', function () {
      const object = new StoneObject({alf: 1, mork: {and: 'mindy'}});

      expect(object).to.eql({alf: 1, mork: {and: 'mindy'}});
      expect(object.mork).to.be.instanceOf(StoneObject);
      expect(function () { object.et = 'phone home'; }).to.throw(frozenError);
    });

    it('returns the same StoneObject when nested within an object', function () {
      const mork = new StoneObject({and: 'mindy'});
      const object = new StoneObject({alf: 1, mork});

      expect(object).to.eql({alf: 1, mork: {and: 'mindy'}});
      expect(object.mork).to.eq(mork);
    });

    xit('handles circular references');
  });

  describe('getters', function () {
    it('retrieves a value by property access', function () {
      const object = new StoneObject({alf: 1, mork: 2});

      expect(object.alf).to.eq(1);
      expect(object.mork).to.eq(2);
    });

    it('has enumerable keys', function () {
      const object = new StoneObject({alf: 1, mork: 2});

      expect(Object.keys(object).sort()).to.eql(['alf', 'mork']);
    });

    xit('throws an error when accessing an arbitrary property', function () {
      const object = new StoneObject({alf: 1, mork: 2});

      expect(function () { return object.et; }).to.throw(/undefined property et/);
    });
  });

  it('throws an error on direct property assignment', function () {
    const object = new StoneObject({});

    expect(function () { object.foo = 'bar'; }).to.throw(frozenError);
  });

  describe('#set', function () {
    it('throws an error given no arguments', function () {
      const object = new StoneObject({});

      expect(object.set).to.throw(/must pass key and value/);
    });

    it('returns the same object when values are unchanged', function () {
      const object = new StoneObject({alf: 1, mork: 2});
      const newObject = object.set('alf', 1);

      expect(object).to.eq(newObject);
    });

    it('returns a new object when values are changed', function () {
      const object = new StoneObject({alf: 1, mork: 2});
      const newObject = object.set('alf', 5);

      expect(object).not.to.eq(newObject);
      expect(newObject.alf).to.eq(5);
    });

    it('does not change values on original object', function () {
      const object = new StoneObject({alf: 1, mork: 2});

      object.set('alf', 5);

      expect(object.alf).to.eq(1);
    });

    it('allows deeply setting values', function () {
      const object = new StoneObject({alf: 1, mork: {and: 'mindy'}});
      const newObject = object.set(['mork', 'nanoo'], 'nanoo');

      expect(newObject).to.eql({alf: 1, mork: {and: 'mindy', nanoo: 'nanoo'}});
    });

    it('throws an error given an empty array as key', function () {
      const object = new StoneObject({alf: 1, mork: {and: 'mindy'}});
      const invalidKeyError = /array key must have at least one element/;

      expect(function () { object.set([], 'nanoo'); }).to.throw(invalidKeyError);
    });
    xit('makes new values immutable');
  });

  describe('#merge', function () {
    it('throws an error given no arguments', function () {
      const object = new StoneObject({});

      expect(object.merge).to.throw(/must pass an object with values/);
    });

    it('returns the same object when values are unchanged', function () {
      const object = new StoneObject({alf: 1, mork: 2});
      const newObject = object.merge({alf: 1, mork: 2});

      expect(object).to.eq(newObject);
    });

    it('returns a new object when values are changed', function () {
      const object = new StoneObject({alf: 1, mork: 2});
      const newObject = object.merge({alf: 5, et: 3});

      expect(object).not.to.eq(newObject);
      expect(newObject.alf).to.eq(5);
    });

    it('does not change values on original object', function () {
      const object = new StoneObject({alf: 1, mork: 2});

      object.merge({alf: 5});

      expect(object.alf).to.eq(1);
    });
    xit('makes new values immutable');
  });
});
