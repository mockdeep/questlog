import React from 'react';
import {shallow} from 'enzyme';

import NotificationCheckbox from 'src/notification/components/checkbox';

const addNotification = jest.fn();
const completeTask = jest.fn();
const disableNotifications = jest.fn();
const enableNotifications = jest.fn();
const removeNotification = jest.fn();
const requestNotificationPermission = jest.fn();

let notificationCheckbox;

beforeEach(() => {
  notificationCheckbox = shallow(
    <NotificationCheckbox
      task={{}}
      addNotification={addNotification}
      removeNotification={removeNotification}
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
