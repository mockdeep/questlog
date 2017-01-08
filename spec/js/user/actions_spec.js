'use strict';

import * as actions from 'js/user/actions';

describe('#updateUser', () => {
  it('returns an UPDATE action for the payload', () => {
    const payload = {foo: 'bar'};
    const action = actions.updateUser(payload);

    expect(action.type).toBe('user/UPDATE');
    expect(action.payload).toBe(payload);
  });
});
