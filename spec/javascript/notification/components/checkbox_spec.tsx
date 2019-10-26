import React from 'react';
import {shallow} from 'enzyme';

import {makeTask} from '_test_helpers/factories';
import NotificationCheckbox from 'src/notification/components/checkbox';

const removeNotification = jest.fn();
const updateUser = jest.fn();
const props = {
  task: makeTask({}),
  addNotification: jest.fn(),
  completeTask: jest.fn(),
  disableNotifications: jest.fn(),
  enableNotifications: jest.fn(),
  removeNotification,
  requestNotificationPermission: jest.fn(),
  notificationsEnabled: false,
  notificationsPermitted: false,
  updateUser,
};

it('is not checked by default', () => {
  const notificationCheckbox = shallow(<NotificationCheckbox {...props} />);

  expect(notificationCheckbox.find('input[type="checkbox"]')).not.toBeChecked();
});

it('is checked when notifications are enabled and task is present', () => {
  const notificationCheckbox = shallow(
    <NotificationCheckbox {...props} notificationsEnabled />,
  );

  expect(notificationCheckbox.find('input[type="checkbox"]')).toBeChecked();
});

it('enables notifications when the checkbox get checked', () => {
  const notificationCheckbox = shallow(<NotificationCheckbox {...props} />);
  const checkboxInput = notificationCheckbox.find("input[type='checkbox']");

  checkboxInput.simulate('change', {target: {checked: true}});

  expect(updateUser).toHaveBeenCalledWith({notificationsEnabled: true});
});

it('notifies again when updated with new task', () => {
  const notificationCheckbox = shallow(<NotificationCheckbox {...props} />);
  const instance = notificationCheckbox.instance() as NotificationCheckbox;
  const notifySpy = jest.spyOn(instance, 'notifyTask');

  notificationCheckbox.setProps({...props, task: {id: 52}});

  expect(notifySpy).toHaveBeenCalled();
});

it('notifies on interval when notificationsEnabled changes to true', () => {
  const notificationCheckbox = shallow(<NotificationCheckbox {...props} />);
  const instance = notificationCheckbox.instance() as NotificationCheckbox;
  const notifySpy = jest.spyOn(instance, 'notifyOnInterval');

  notificationCheckbox.setProps({...props, notificationsEnabled: true});

  expect(notifySpy).toHaveBeenCalled();
});

it('closes notifications when the component unmounts', () => {
  const notificationCheckbox = shallow(<NotificationCheckbox {...props} />);

  notificationCheckbox.unmount();

  expect(removeNotification).toHaveBeenCalledWith({key: 'currentTask'});
});
