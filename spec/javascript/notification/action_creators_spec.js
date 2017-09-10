import FakeNotification from '_test_helpers/fake_notification';

import {
  ADD, REMOVE,
  addNotification, removeNotification,
} from 'src/notification/action_creators';

describe('addNotification', () => {
  it('returns a ADD action object', () => {
    const payload = {key: 'myKey'};

    const action = addNotification(payload);

    expect(action.type).toBe(ADD);
    expect(action.payload.key).toBe('myKey');
  });

  it('creates a new notification', () => {
    const payload = {key: 'myKey', message: 'my cool message'};

    const action = addNotification(payload);
    const {notification} = action.payload;

    expect(notification).toBeInstanceOf(FakeNotification);
    expect(notification.message).toBe('my cool message');
  });

  it('adds a custom onClick handler to the notification', () => {
    const payload = {key: 'myKey', onClick: jest.fn()};

    const action = addNotification(payload);
    const {notification} = action.payload;

    expect(payload.onClick).not.toHaveBeenCalled();
    notification.onclick();
    expect(payload.onClick).toHaveBeenCalled();
  });
});

describe('removeNotification', () => {
  it('returns a removeNotification thunk', () => {
    const payload = {my: 'payload'};
    const thunk = removeNotification(payload);

    expect(thunk.length).toBe(2);
    expect(thunk.name).toBe('removeNotificationThunk');
  });

  describe('thunk', () => {
    it('does not try to close a non-existent notification', () => {
      const payload = {my: 'payload'};
      const thunk = removeNotification(payload);
      const getState = jest.fn(() => ({notification: {}}));
      const dispatch = jest.fn();

      expect(() => thunk(dispatch, getState)).not.toThrow();
    });

    it('closes the associated notification when present', () => {
      const payload = {key: 'myKey'};
      const thunk = removeNotification(payload);
      const notification = new FakeNotification();
      const getState = jest.fn(() => ({notification: {myKey: notification}}));
      const dispatch = jest.fn();

      expect(notification.isOpen).toBe(true);
      thunk(dispatch, getState);
      expect(notification.isOpen).toBe(false);
    });

    it('dispatches a REMOVE action', () => {
      const payload = {my: 'payload'};
      const thunk = removeNotification(payload);
      const getState = jest.fn(() => ({notification: {}}));
      const dispatch = jest.fn();

      thunk(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({type: REMOVE, payload});
    });
  });
});
