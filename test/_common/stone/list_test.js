'use strict';

const Stone = require('_common/stone');

const frozenError = /object is not extensible/;

describe('Stone.List', function () {
  describe('constructor', function () {
    it('throws an error given no arguments', function () {
      const message = /must be initialized with an array/;

      expect(function () { return new Stone.List(); }).to.throw(message);
    });

    it('throws an error when first argument is not an array', function () {
      const message = /must be initialized with an array/;

      expect(function () { return new Stone.List('foo'); }).to.throw(message);
      expect(function () { return new Stone.List({}); }).to.throw(message);
    });

    it('returns a new empty List object', function () {
      const list = new Stone.List([]);

      expect(list).to.eql([]);
      expect(Array.isArray(list)).to.be.true();
      expect(list).to.be.instanceOf(Stone.List);
    });

    it('returns a new List with same keys as the given array', function () {
      const list = new Stone.List(['alf', 'mork']);

      expect(list).to.eql(['alf', 'mork']);
      expect(list).to.be.instanceOf(Stone.List);
    });

    it('returns nested immutable structures all the way down', function () {
      const list = new Stone.List(['alf', 'mork', ['and', 'mindy']]);

      expect(list).to.eql(['alf', 'mork', ['and', 'mindy']]);
      expect(list[2]).to.be.instanceOf(Stone.List);
      expect(function () { list[3] = 'phone home'; }).to.throw(frozenError);
    });

    it('throws an error when using mutation methods', function () {
      const list = new Stone.List(['alf', 'mork']);

      expect(function () { list.push(5); }).to.throw(frozenError);
    });

    it('allows you to concat new stuff', function () {
      const list = new Stone.List(['alf', 'mork']);

      expect(list.concat(5)).to.eql(['alf', 'mork', 5]);
    });

    it('returns the same List when nested within an array', function () {
      const mork = new Stone.List(['and', 'mindy']);
      const list = new Stone.List(['alf', 'mork', mork]);

      expect(list).to.eql(['alf', 'mork', ['and', 'mindy']]);
      expect(list[2]).to.eq(mork);
    });

    xit('handles circular references');
  });
});
