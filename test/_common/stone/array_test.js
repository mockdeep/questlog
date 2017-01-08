'use strict';

import StoneArray from 'js/_common/stone/array';
import StoneObject from 'js/_common/stone/object';

const frozenError = /object is not extensible/;

describe('StoneArray', function () {
  describe('constructor', function () {
    it('throws an error given no arguments', function () {
      const message = /must be initialized with an array/;

      expect(function () { return new StoneArray(); }).to.throw(message);
    });

    it('throws an error when first argument is not an array', function () {
      const message = /must be initialized with an array/;

      expect(function () { return new StoneArray('foo'); }).to.throw(message);
      expect(function () { return new StoneArray({}); }).to.throw(message);
    });

    it('returns a new empty StoneArray', function () {
      const array = new StoneArray([]);

      expect(array).to.eql([]);
      expect(Array.isArray(array)).to.be.true();
      expect(array).to.be.instanceOf(StoneArray);
    });

    it('returns a new StoneArray with same keys as the given array', function () {
      const array = new StoneArray(['alf', 'mork']);

      expect(array).to.eql(['alf', 'mork']);
      expect(array).to.be.instanceOf(StoneArray);
    });

    it('returns nested immutable StoneArrays all the way down', function () {
      const sourceArray = ['alf', 'mork', ['and', 'mindy']];
      const array = new StoneArray(sourceArray);

      expect(array).to.eql(sourceArray);
      expect(array[2]).to.be.instanceOf(StoneArray);
      expect(function () { array[3] = 'phone home'; }).to.throw(frozenError);
    });

    it('returns StoneObjects within StoneArrays', function () {
      const sourceArray = ['alf', 'mork', {and: 'mindy'}];
      const array = new StoneArray(sourceArray);

      expect(array).to.eql(sourceArray);
      expect(array[2]).to.be.instanceOf(StoneObject);
    });

    it('throws an error when using mutation methods', function () {
      const array = new StoneArray(['alf', 'mork']);

      expect(function () { array.push(5); }).to.throw(frozenError);
    });

    it('allows you to concat new stuff', function () {
      const array = new StoneArray(['alf', 'mork']);

      expect(array.concat(5)).to.eql(['alf', 'mork', 5]);
    });

    it('returns the same StoneArray when nested within an array', function () {
      const mork = new StoneArray(['and', 'mindy']);
      const array = new StoneArray(['alf', 'mork', mork]);

      expect(array).to.eql(['alf', 'mork', ['and', 'mindy']]);
      expect(array[2]).to.eq(mork);
    });

    xit('handles circular references');
  });
});
