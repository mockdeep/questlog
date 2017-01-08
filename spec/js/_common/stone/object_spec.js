'use strict';

import StoneArray from 'js/_common/stone/array';
import StoneObject from 'js/_common/stone/object';

const frozenError = /object is not extensible/;

describe('StoneObject', () => {
  describe('constructor', () => {
    it('throws an error given no arguments', () => {
      const message = /must be initialized with an object/;

      expect(() => new StoneObject()).toThrow(message);
    });

    it('throws an error when first argument is not an object', () => {
      const message = /must be initialized with an object/;

      expect(() => new StoneObject('foo')).toThrow(message);
      expect(() => new StoneObject([])).toThrow(message);
    });

    it('returns a new empty StoneObject', () => {
      const object = new StoneObject({});

      expect(object).toEqual({});
      expect(object).toBeInstanceOf(StoneObject);
    });

    it('returns a new StoneObject with the same keys as the given object', () => {
      const object = new StoneObject({alf: 1, mork: 2});

      expect(object).toEqual({alf: 1, mork: 2});
      expect(object).toBeInstanceOf(StoneObject);
    });

    it('returns nested immutable structures all the way down', () => {
      const object = new StoneObject({alf: 1, mork: {and: 'mindy'}});

      expect(object).toEqual({alf: 1, mork: {and: 'mindy'}});
      expect(object.mork).toBeInstanceOf(StoneObject);
      expect(() => { object.et = 'phone home'; }).toThrow(frozenError);
    });

    it('returns StoneArrays within StoneObjects', () => {
      const sourceObject = {alf: 1, mork: ['and', 'mindy']};
      const object = new StoneObject(sourceObject);

      expect(object).toEqual(sourceObject);
      expect(object.mork).toBeInstanceOf(StoneArray);
    });

    it('returns the same StoneObject when nested within an object', () => {
      const mork = new StoneObject({and: 'mindy'});
      const object = new StoneObject({alf: 1, mork});

      expect(object).toEqual({alf: 1, mork: {and: 'mindy'}});
      expect(object.mork).toBe(mork);
    });

    xit('handles circular references');
  });

  describe('getters', () => {
    it('retrieves a value by property access', () => {
      const object = new StoneObject({alf: 1, mork: 2});

      expect(object.alf).toBe(1);
      expect(object.mork).toBe(2);
    });

    it('has enumerable keys', () => {
      const object = new StoneObject({alf: 1, mork: 2});

      expect(Object.keys(object).sort()).toEqual(['alf', 'mork']);
    });

    xit('throws an error when accessing an arbitrary property', () => {
      const object = new StoneObject({alf: 1, mork: 2});

      expect(() => object.et).toThrow(/undefined property et/);
    });
  });

  it('throws an error on direct property assignment', () => {
    const object = new StoneObject({});

    expect(() => { object.foo = 'bar'; }).toThrow(frozenError);
  });

  describe('#set', () => {
    it('throws an error given no arguments', () => {
      const object = new StoneObject({});

      expect(object.set).toThrow(/must pass key and value/);
    });

    it('returns the same object when values are unchanged', () => {
      const object = new StoneObject({alf: 1, mork: 2});
      const newObject = object.set('alf', 1);

      expect(object).toBe(newObject);
    });

    it('returns a new object when values are changed', () => {
      const object = new StoneObject({alf: 1, mork: 2});
      const newObject = object.set('alf', 5);

      expect(object).not.toBe(newObject);
      expect(newObject.alf).toBe(5);
    });

    it('does not change values on original object', () => {
      const object = new StoneObject({alf: 1, mork: 2});

      object.set('alf', 5);

      expect(object.alf).toBe(1);
    });

    it('allows deeply setting values', () => {
      const object = new StoneObject({alf: 1, mork: {and: 'mindy'}});
      const newObject = object.set(['mork', 'nanoo'], 'nanoo');

      expect(newObject).toEqual({alf: 1, mork: {and: 'mindy', nanoo: 'nanoo'}});
    });

    it('throws an error given an empty array as key', () => {
      const object = new StoneObject({alf: 1, mork: {and: 'mindy'}});
      const invalidKeyError = /array key must have at least one element/;

      expect(() => { object.set([], 'nanoo'); }).toThrow(invalidKeyError);
    });
    xit('makes new values immutable');
  });

  describe('#merge', () => {
    it('throws an error given no arguments', () => {
      const object = new StoneObject({});

      expect(object.merge).toThrow(/must pass an object with values/);
    });

    it('returns the same object when values are unchanged', () => {
      const object = new StoneObject({alf: 1, mork: 2});
      const newObject = object.merge({alf: 1, mork: 2});

      expect(object).toBe(newObject);
    });

    it('returns a new object when values are changed', () => {
      const object = new StoneObject({alf: 1, mork: 2});
      const newObject = object.merge({alf: 5, et: 3});

      expect(object).not.toBe(newObject);
      expect(newObject.alf).toBe(5);
    });

    it('does not change values on original object', () => {
      const object = new StoneObject({alf: 1, mork: 2});

      object.merge({alf: 5});

      expect(object.alf).toBe(1);
    });
    xit('makes new values immutable');
  });
});
