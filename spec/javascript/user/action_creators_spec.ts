import * as actionCreators from 'src/user/action_creators';

describe('#updateUser', () => {
  it('returns an UPDATE action for the payload', () => {
    const payload: User = {foo: 'bar'};
    const action = actionCreators.updateUser(payload);

    expect(action.type).toBe('user/UPDATE');
    expect(action.payload).toBe(payload);
  });
});
