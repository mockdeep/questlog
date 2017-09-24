import React from 'react';
import {shallow} from 'enzyme';

import NotificationCheckbox from 'src/notification/components/checkbox';

const requestPermission = jest.fn();
const Notification = {requestPermission, permission: 'default'};

window.Notification = Notification;

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

afterEach(() => {
  Notification.permission = 'default';
});

describe('NotificationCheckbox', () => {
  it('enables notifications', () => {
    requestPermission.mockReturnValue({then: jest.fn()});
    const notificationCheckbox = shallow(
      <NotificationCheckbox {...props} />,
      renderOpts
    );
    const fakeEvent = {target: {checked: true}};

    notificationCheckbox.find('input[type="checkbox"]').simulate('change', fakeEvent);

    expect(requestPermission).toHaveBeenCalled();
  });

  it('is not checked by default', () => {
    const notificationCheckbox = shallow(
      <NotificationCheckbox {...props} />,
      renderOpts
    );

    expect(notificationCheckbox.find('input[type="checkbox"]')).not.toBeChecked();
  });

  it('is checked when notifications are enabled and task is present', () => {
    Notification.permission = 'granted';
    const notificationCheckbox = shallow(
      <NotificationCheckbox {...props} task={{id: 5}} notificationsEnabled />,
      renderOpts
    );

    expect(notificationCheckbox.find('input[type="checkbox"]')).toBeChecked();
  });
});
