'use strict';

const reducer = require('user/reducer');
const actions = require('user/actions');

describe('user/reducer', function () {
  describe('INIT', function () {
    it('returns a new empty object', function () {
      const action = {type: 'user/INIT'};

      expect(reducer(null, action)).to.eql({});
    });

    it('returns an immutable object', function () {
      const action = {type: 'user/INIT'};

      expect(reducer(null, action)).to.be.frozen();
    });
  });
  describe('UPDATE', function () {
    it('returns a new object with updated config', function () {
      const action = actions.updateUser({booger: 'flick'});
      const result = reducer({foo: 'bar'}, action);

      expect(result).to.eql({foo: 'bar', booger: 'flick'});
    });

    it('returns an immutable object', function () {
      const action = actions.updateUser({payload: {booger: 'flick'}});

      expect(reducer({foo: 'bar'}, action)).to.be.frozen();
    });
  });

  describe('invalid action type', function () {
    it('throws an error', function () {
      const action = {type: 'user/FLICK', payload: {booger: 'flick'}};
      const message = 'invalid action type: "user/FLICK"';

      expect(function () { reducer({foo: 'bar'}, action); }).to.throw(message);
    });
  });
});


