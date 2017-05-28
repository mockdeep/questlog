import React from 'react';
import {shallow} from 'enzyme';

import Item from 'src/task/components/item';
import NotificationCheckbox from 'src/notification/containers/checkbox';

const props = {
  match: {},
  params: {},
  notificationsEnabled: false,
  notificationsPermitted: true,
  enableNotifications: jest.fn(),
  disableNotifications: jest.fn(),
  deleteTask: jest.fn(),
  fetchTasks: jest.fn(),
  postponeSeconds: 250,
  tags: [],
  updateTagMeta: jest.fn(),
  updateTaskMeta: jest.fn(),
};

describe('ItemContainer', () => {
  it('renders the notification checkbox', () => {
    const component = shallow(<Item {...props} />);

    expect(component.find(NotificationCheckbox)).toHaveLength(1);
  });
});
