'use strict';

import reducer from '_common/root_reducer';

describe('root_reducer', function () {
  describe('init', function () {
    it('returns a blank nested tree of state', function () {
      const action = {type: '@@redux/INIT'};

      expect(reducer(null, action)).to.eql({user: {}});
    });

    it('returns an immutable object', function () {
      const action = {type: '@@redux/INIT'};

      expect(reducer(null, action)).to.be.frozen();
    });
  });

  describe('user actions', function () {
    it('delegates to the user reducer', function () {
      const action = {type: 'user/UPDATE', payload: {goober: 'globber'}};
      const result = reducer({user: {blah: 'bloo'}}, action);

      expect(result).to.eql({user: {blah: 'bloo', goober: 'globber'}});
    });
  });

  describe('invalid action type', function () {
    it('throws an error', function () {
      const action = {type: 'booger/UPDATE', payload: {booger: 'flick'}};
      const message = 'no reducer for action: "booger/UPDATE"';

      expect(function () { reducer({foo: 'bar'}, action); }).to.throw(message);
    });
  });
});
