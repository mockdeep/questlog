import reducer from 'src/app_reducer';

describe('appReducer', () => {
  describe('init', () => {
    it('returns a blank nested tree of state', () => {
      const action = {type: '@@redux/INIT'};
      const expectedState = {
        user: {},
        notification: {task: null},
        tag: {byId: {}, orderedIds: []},
        task: {
          byId: {},
          orderedIds: [],
          meta: {postponeSeconds: 300},
          newTask: {title: ''},
        },
      };

      expect(reducer(null, action)).toEqual(expectedState);
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
