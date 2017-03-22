import React from 'react';
import {shallow} from 'enzyme';

import NotificationCheckbox from 'js/notification/components/checkbox';

const completeTask = jest.fn();
const enableNotifications = jest.fn();
const disableNotifications = jest.fn();
const requestNotificationPermission = jest.fn();

let notificationCheckbox;

beforeEach(() => {
  notificationCheckbox = shallow(
    <NotificationCheckbox
      task={{}}
      notificationsEnabled={false}
      notificationsPermitted={true}
      completeTask={completeTask}
      enableNotifications={enableNotifications}
      disableNotifications={disableNotifications}
      requestNotificationPermission={requestNotificationPermission}
    />
  );
});

describe('NotificationCheckbox', () => {
  it('enables notifications', () => {
    const fakeEvent = {target: {checked: true}};

    notificationCheckbox.find('input[type="checkbox"]').simulate('click', fakeEvent);

    expect(enableNotifications).toHaveBeenCalled();
  });
});
