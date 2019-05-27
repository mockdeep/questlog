import React from 'react';
import {shallow} from 'enzyme';

import {makeTask} from '_test_helpers/factories';
import TaskFooter, {Props} from 'src/_common/components/task_footer';

const props: Props = {task: makeTask({}), completeTask: jest.fn()};

it('renders the notification checkbox', () => {
  const component = shallow(<TaskFooter {...props} />);

  expect(component.find('Connect(NotificationCheckbox)')).toExist();
});

it('renders a footer with useful links', () => {
  const component = shallow(<TaskFooter {...props} />);
  const links = component.find('a');

  expect(links).toHaveLength(1);

  const link = links.at(0);

  expect(link).toHaveProp('href', '/bulk_task/new');
  expect(link.children()).toHaveText('Add multiple tasks');

  expect(component.find('Connect(ModalLink)')).toHaveLength(2);
});
