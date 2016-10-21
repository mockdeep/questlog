'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import * as td from 'testdouble';

import ItemContainer from 'task/containers/item';

const enableNotifications = td.function();
const disableNotifications = td.function();
let itemContainer;

beforeEach(function () {
  itemContainer = shallow(<ItemContainer
    params={{}}
    notificationsEnabled={false}
    notificationsPermitted={true}
    enableNotifications={enableNotifications}
    disableNotifications={disableNotifications}
  />);
});

describe('ItemContainer', function () {
  it('enables notifications', function () {
    const fakeEvent = {target: {checked: true}};

    itemContainer.find('input[type="checkbox"]').simulate('click', fakeEvent);
    td.verify(enableNotifications());
  });
});
