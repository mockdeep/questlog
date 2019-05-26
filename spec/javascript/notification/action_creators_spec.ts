import FakeNotification from '_test_helpers/fake_notification';
import {makeState} from '_test_helpers/factories';

import {
  ADD, REMOVE,
  addNotification, removeNotification,
  Payload,
} from 'src/notification/action_creators';

describe('addNotification', () => {
  const basePayload: Payload =
    {key: 'currentTask', message: 'aMessage', onClick: jest.fn()};

  it('returns a removeNotification thunk', () => {
    const payload = {...basePayload, my: 'payload'};
    const thunk = addNotification(payload);

    expect(thunk.length).toBe(1);
    expect(thunk.name).toBe('addNotificationThunk');
  });

  describe('thunk', () => {
    it('dispatches an ADD action object', async () => {
      const thunk = addNotification(basePayload);
      const dispatch = jest.fn();

      await thunk(dispatch, () => makeState({}), null);

      const [action] = dispatch.mock.calls[0];

      expect(action.type).toBe(ADD);
      expect(action.payload.key).toBe('currentTask');
    });

    it('creates a new notification', async () => {
      const payload: Payload = {...basePayload, message: 'my message'};
      const thunk = addNotification(payload);
      const dispatch = jest.fn();

      await thunk(dispatch, () => makeState({}), null);

      const [action] = dispatch.mock.calls[0];
      const {notification} = action.payload;

      expect(notification).toBeInstanceOf(FakeNotification);
      expect(notification.message).toBe('my message');
    });

    it('adds a custom onClick handler to the notification', async () => {
      const thunk = addNotification(basePayload);
      const dispatch = jest.fn();

      await thunk(dispatch, () => makeState({}), null);

      const [action] = dispatch.mock.calls[0];
      const {notification} = action.payload;

      expect(basePayload.onClick).not.toHaveBeenCalled();
      notification.onclick();
      expect(basePayload.onClick).toHaveBeenCalled();
    });
  });
});

describe('removeNotification', () => {
  it('returns a removeNotification thunk', () => {
    const thunk = removeNotification({key: 'currentTask'});

    expect(thunk.length).toBe(2);
    expect(thunk.name).toBe('removeNotificationThunk');
  });

  describe('thunk', () => {
    it('does not try to close a non-existent notification', () => {
      const thunk = removeNotification({key: 'currentTask'});
      const getState = jest.fn(() => ({notification: {currentTask: null}}));
      const dispatch = jest.fn();

      expect(() => thunk(dispatch, getState, null)).not.toThrow();
    });

    it('closes the associated notification when present', () => {
      const thunk = removeNotification({key: 'currentTask'});
      const notification = new FakeNotification('some message');
      const getState =
        jest.fn(() => ({notification: {currentTask: notification}}));
      const dispatch = jest.fn();

      expect(notification.isOpen).toBe(true);
      thunk(dispatch, getState, null);
      expect(notification.isOpen).toBe(false);
    });

    it('dispatches a REMOVE action', () => {
      const payload: {key: NotificationKey} = {key: 'currentTask'};
      const thunk = removeNotification(payload);
      const getState = jest.fn(() => ({notification: {currentTask: null}}));
      const dispatch = jest.fn();

      thunk(dispatch, getState, null);

      expect(dispatch).toHaveBeenCalledWith({type: REMOVE, payload});
    });
  });
});
