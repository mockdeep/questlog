import {INIT} from 'src/notification/action_creators';
import notificationReducer from 'src/notification/reducer';

describe(INIT, () => {
  it('returns basic notification state', () => {
    const expected = {};

    expect(notificationReducer(null, {type: INIT})).toEqual(expected);
  });
});
