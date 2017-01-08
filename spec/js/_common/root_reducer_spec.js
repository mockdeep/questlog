'use strict';

import reducer from 'js/_common/root_reducer';

describe('root_reducer', () => {
  describe('init', () => {
    it('returns a blank nested tree of state', () => {
      const action = {type: '@@redux/INIT'};

      expect(reducer(null, action)).toEqual({user: {}});
    });

    it('returns an immutable object', () => {
      const action = {type: '@@redux/INIT'};
      const result = reducer(null, action);

      expect(Object.isFrozen(result)).toBe(true);
    });
  });

  describe('user actions', () => {
    it('delegates to the user reducer', () => {
      const action = {type: 'user/UPDATE', payload: {goober: 'globber'}};
      const result = reducer({user: {blah: 'bloo'}}, action);

      expect(result).toEqual({user: {blah: 'bloo', goober: 'globber'}});
    });
  });

  describe('invalid action type', () => {
    it('throws an error', () => {
      const action = {type: 'booger/UPDATE', payload: {booger: 'flick'}};
      const message = 'no reducer for action: "booger/UPDATE"';

      expect(() => { reducer({foo: 'bar'}, action); }).toThrow(message);
    });
  });
});
