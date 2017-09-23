import {INIT, SET} from 'src/route/action_creators';
import routeReducer from 'src/route/reducer';

describe(INIT, () => {
  it('returns basic route state', () => {
    const action = {type: INIT};

    expect(routeReducer({}, action)).toEqual({params: {}});
  });
});

describe(SET, () => {
  it('returns route object corresponding to the given payload', () => {
    const action = {type: SET, payload: {goober: 'gabber'}};

    expect(routeReducer({}, action)).toBe(action.payload);
  });
});
