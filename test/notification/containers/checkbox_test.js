import React from 'react';
import {shallow} from 'enzyme';
import * as td from 'testdouble';

import NotificationCheckbox from 'js/notification/containers/checkbox';

const completeTask = td.function();
const enableNotifications = td.function();
const disableNotifications = td.function();
const requestNotificationPermission = td.function();

let notificationCheckbox;

beforeEach(function () {
  notificationCheckbox = shallow(<NotificationCheckbox
    task={{}}
    notificationsEnabled={false}
    notificationsPermitted={true}
    completeTask={completeTask}
    enableNotifications={enableNotifications}
    disableNotifications={disableNotifications}
    requestNotificationPermission={requestNotificationPermission}
  />);
});

describe('NotificationCheckbox', function () {
  it('enables notifications', function () {
    const fakeEvent = {target: {checked: true}};

    notificationCheckbox.find('input[type="checkbox"]').simulate('click', fakeEvent);

    td.verify(enableNotifications());
  });
});
