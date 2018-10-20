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
      const notificationState = {notificationsEnabled: true};
      const result = reducer({user: notificationState}, action);

      expect(result).toEqual({user: {...notificationState, goober: 'globber'}});
    });
  });

  describe('invalid action type', () => {
    it('throws an error', () => {
      const action = {type: 'booger/UPDATE', payload: {booger: 'flick'}};
      const message = /invalid reducer key "booger"/u;

      expect(() => {
        reducer({user: {notificationsEnabled: false}}, action);
      }).toThrow(message);
    });
  });
});
