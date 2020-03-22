import reducer from 'src/user/reducer';
import {INIT, UPDATE} from 'src/user/action_creators';

import {makeUserState} from '_test_helpers/factories';

describe(INIT, () => {
  it('returns a new empty object', () => {
    const action = {type: INIT};

    expect(reducer(null, action)).toEqual({});
  });
});

describe(UPDATE, () => {
  it('returns a new object with updated config', () => {
    const previousState = makeUserState({});
    const action = {type: UPDATE, payload: {notificationsEnabled: true}};
    const expectedState = {notificationsEnabled: true};

    expect(reducer(previousState, action)).toEqual(expectedState);
  });
});
