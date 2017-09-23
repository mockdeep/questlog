import React from 'react';
import {shallow} from 'enzyme';

import NotificationCheckbox from 'src/notification/components/checkbox';

const requestPermission = jest.fn();
const Notification = {requestPermission};

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

describe('NotificationCheckbox', () => {
  it('enables notifications', () => {
    requestPermission.mockReturnValue({then: jest.fn()});
    const notificationCheckbox = shallow(
      <NotificationCheckbox {...props} />,
      {lifecycleExperimental: true}
    );
    const fakeEvent = {target: {checked: true}};

    notificationCheckbox.find('input[type="checkbox"]').simulate('click', fakeEvent);

    expect(requestPermission).toHaveBeenCalled();
  });
});
