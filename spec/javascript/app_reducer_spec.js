import reducer from 'src/app_reducer';

describe('appReducer', () => {
  describe('init', () => {
    it('returns a blank nested tree of state', () => {
      const action = {type: '@@redux/INIT'};
      const expectedState = {
        common: {},
        user: {},
        notification: {},
        route: {params: {}},
        scratch: {},
        tag: {byId: {}, meta: {}},
        task: {
          byId: {},
          meta: {
            postponeSeconds: 300,
            newTask: {title: ''},
            ajaxState: 'loading',
          },
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
      const message = /object has no key "booger"/;

      expect(() => { reducer({foo: 'bar'}, action); }).toThrow(message);
    });
  });
});
