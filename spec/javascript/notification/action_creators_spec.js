import {
  ADD, REMOVE,
  addNotification, removeNotification,
} from 'src/notification/action_creators';

describe('addNotification', () => {
  it('returns a ADD action object', () => {
    const payload = {my: 'payload'};
    const expectedAction = {type: ADD, payload};

    expect(addNotification(payload)).toEqual(expectedAction);
  });
});

describe('removeNotification', () => {
  it('returns a REMOVE action object', () => {
    const payload = {my: 'payload'};
    const expectedAction = {type: REMOVE, payload};

    expect(removeNotification(payload)).toEqual(expectedAction);
  });
});
