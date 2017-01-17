'use strict';

import reducer from 'js/_common/root_reducer';

describe('rootReducer', () => {
  describe('init', () => {
    it('returns a blank nested tree of state', () => {
      const action = {type: '@@redux/INIT'};

      expect(reducer(null, action)).toEqual({user: {}});
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
      const message = 'no reducer found for: "booger"';

      expect(() => { reducer({foo: 'bar'}, action); }).toThrow(message);
    });
  });
});
