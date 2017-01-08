'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import * as td from 'testdouble';

import ItemContainer from 'js/task/containers/item';
import NotificationCheckbox from 'js/notification/containers/checkbox';

const enableNotifications = td.function();
const disableNotifications = td.function();
const requestNotificationPermission = td.function();
let itemContainer;

beforeEach(() => {
  itemContainer = shallow(<ItemContainer
    params={{}}
    notificationsEnabled={false}
    notificationsPermitted={true}
    enableNotifications={enableNotifications}
    disableNotifications={disableNotifications}
    requestNotificationPermission={requestNotificationPermission}
  />);
});

describe('ItemContainer', () => {
  it('renders the notification checkbox', () => {
    expect(itemContainer.find(NotificationCheckbox)).toHaveLength(1);
  });
});
