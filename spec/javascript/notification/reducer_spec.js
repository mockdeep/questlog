import {INIT, ADD} from 'src/notification/action_creators';
import notificationReducer from 'src/notification/reducer';

describe(INIT, () => {
  it('returns basic notification state', () => {
    const expected = {};

    expect(notificationReducer(null, {type: INIT})).toEqual(expected);
  });
});

describe(ADD, () => {
  it('returns a new object with a payload merged in', () => {
    const someKey = Math.random();
    const previousState = {[someKey]: Math.random()};
    const action = {type: ADD, payload: {key: 'foo', notification: 'bar'}};
    const expected = {[someKey]: previousState[someKey], foo: 'bar'};

    expect(notificationReducer(previousState, action)).toEqual(expected);
  });
});
