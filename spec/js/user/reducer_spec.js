'use strict';

import reducer from 'js/user/reducer';
import * as actions from 'js/user/actions';

describe('user/reducer', () => {
  describe('INIT', () => {
    it('returns a new empty object', () => {
      const action = {type: 'user/INIT'};

      expect(reducer(null, action)).toEqual({});
    });
  });
  describe('UPDATE', () => {
    it('returns a new object with updated config', () => {
      const action = actions.updateUser({booger: 'flick'});
      const result = reducer({foo: 'bar'}, action);

      expect(result).toEqual({foo: 'bar', booger: 'flick'});
    });
  });

  describe('invalid action type', () => {
    it('throws an error', () => {
      const action = {type: 'user/FLICK', payload: {booger: 'flick'}};
      const message = 'invalid action type: "user/FLICK"';

      expect(() => { reducer({foo: 'bar'}, action); }).toThrow(message);
    });
  });
});


