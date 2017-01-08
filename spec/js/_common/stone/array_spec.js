'use strict';

import StoneArray from 'js/_common/stone/array';
import StoneObject from 'js/_common/stone/object';

const frozenError = /object is not extensible/;

describe('StoneArray', () => {
  describe('constructor', () => {
    it('throws an error given no arguments', () => {
      const message = /must be initialized with an array/;

      expect(() => new StoneArray()).toThrow(message);
    });

    it('throws an error when first argument is not an array', () => {
      const message = /must be initialized with an array/;

      expect(() => new StoneArray('foo')).toThrow(message);
      expect(() => new StoneArray({})).toThrow(message);
    });

    it('returns a new empty StoneArray', () => {
      const array = new StoneArray([]);

      expect(array).toEqual([]);
      expect(Array.isArray(array)).toBe(true);
      expect(array).toBeInstanceOf(StoneArray);
    });

    it('returns a new StoneArray with same keys as the given array', () => {
      const array = new StoneArray(['alf', 'mork']);

      expect(array).toEqual(['alf', 'mork']);
      expect(array).toBeInstanceOf(StoneArray);
    });

    it('returns nested immutable StoneArrays all the way down', () => {
      const sourceArray = ['alf', 'mork', ['and', 'mindy']];
      const array = new StoneArray(sourceArray);

      expect(array).toEqual(sourceArray);
      expect(array[2]).toBeInstanceOf(StoneArray);
      expect(() => { array[3] = 'phone home'; }).toThrow(frozenError);
    });

    it('returns StoneObjects within StoneArrays', () => {
      const sourceArray = ['alf', 'mork', {and: 'mindy'}];
      const array = new StoneArray(sourceArray);

      expect(array).toEqual(sourceArray);
      expect(array[2]).toBeInstanceOf(StoneObject);
    });

    it('throws an error when using mutation methods', () => {
      const array = new StoneArray(['alf', 'mork']);

      expect(() => { array.push(5); }).toThrow(frozenError);
    });

    it('allows you to concat new stuff', () => {
      const array = new StoneArray(['alf', 'mork']);

      expect(array.concat(5)).toEqual(['alf', 'mork', 5]);
    });

    it('returns the same StoneArray when nested within an array', () => {
      const mork = new StoneArray(['and', 'mindy']);
      const array = new StoneArray(['alf', 'mork', mork]);

      expect(array).toEqual(['alf', 'mork', ['and', 'mindy']]);
      expect(array[2]).toBe(mork);
    });

    xit('handles circular references');
  });
});
