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

const renderOpts = {lifecycleExperimental: true};

describe('NotificationCheckbox', () => {
  it('is not checked by default', () => {
    const notificationCheckbox = shallow(
      <NotificationCheckbox {...props} />,
      renderOpts
    );

    expect(notificationCheckbox.find('input[type="checkbox"]')).not.toBeChecked();
  });

  it('is checked when notifications are enabled and task is present', () => {
    const notificationCheckbox = shallow(
      <NotificationCheckbox {...props} task={{id: 5}} notificationsEnabled />,
      renderOpts
    );

    expect(notificationCheckbox.find('input[type="checkbox"]')).toBeChecked();
  });
});
