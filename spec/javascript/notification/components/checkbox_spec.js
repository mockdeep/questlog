import React from 'react';
import {shallow} from 'enzyme';

import NotificationCheckbox from 'src/notification/components/checkbox';

const props = {
  task: {},
  addNotification: jest.fn(),
  completeTask: jest.fn(),
  disableNotifications: jest.fn(),
  enableNotifications: jest.fn(),
  removeNotification: jest.fn(),
  requestNotificationPermission: jest.fn(),
  notificationsEnabled: false,
  notificationsPermitted: false,
  updateUser: jest.fn(),
};

describe('NotificationCheckbox', () => {
  it('is not checked by default', () => {
    const notificationCheckbox = shallow(<NotificationCheckbox {...props} />);

    expect(notificationCheckbox.find('input[type="checkbox"]')).not.toBeChecked();
  });

  it('is checked when notifications are enabled and task is present', () => {
    const notificationCheckbox = shallow(
      <NotificationCheckbox {...props} task={{id: 5}} notificationsEnabled />
    );

    expect(notificationCheckbox.find('input[type="checkbox"]')).toBeChecked();
  });
});
