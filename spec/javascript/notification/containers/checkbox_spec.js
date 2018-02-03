import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import NotificationCheckboxContainer
  from 'src/notification/containers/checkbox';

import {makeTask} from '_test_helpers/factories';

const props = {
  completeTask: jest.fn(),
  store: createAppStore(),
  task: makeTask({}),
};

it('wraps the NotificationCheckbox component', () => {
  const container = shallow(<NotificationCheckboxContainer {...props} />);

  expect(container.find('NotificationCheckbox')).toHaveLength(1);
});
