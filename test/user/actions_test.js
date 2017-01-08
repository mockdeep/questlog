'use strict';

import * as actions from 'js/user/actions';

describe('#updateUser', function () {
  it('returns an UPDATE action for the payload', function () {
    const payload = {foo: 'bar'};
    const action = actions.updateUser(payload);

    expect(action.type).to.eq('user/UPDATE');
    expect(action.payload).to.eq(payload);
  });
});
