import React from 'react';
import {shallow} from 'enzyme';

import ItemContainer from 'js/task/containers/item';
import NotificationCheckbox from 'js/notification/containers/checkbox';

const enableNotifications = jest.fn();
const disableNotifications = jest.fn();
const requestNotificationPermission = jest.fn();
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
