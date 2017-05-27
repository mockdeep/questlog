import reducer from 'src/user/reducer';
import {INIT, UPDATE} from 'src/user/action_creators';

describe(INIT, () => {
  it('returns a new empty object', () => {
    const action = {type: INIT};

    expect(reducer(null, action)).toEqual({});
  });
});
describe(UPDATE, () => {
  it('returns a new object with updated config', () => {
    const previousState = {foo: 'bar'};
    const action = {type: UPDATE, payload: {booger: 'flick'}};
    const expectedState = {foo: 'bar', booger: 'flick'};

    expect(reducer(previousState, action)).toEqual(expectedState);
  });
});
