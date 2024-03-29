import React from 'react';
import {shallow} from 'enzyme';

import TaskLink from 'src/task/components/link';

import {makeTask} from '_test_helpers/factories';

it('renders a link to the task', () => {
  const task = makeTask({title: 'my title'});
  const component = shallow(<TaskLink task={task} />);

  const link = component.find('a');

  expect(link).toHaveProp('children', task.title);
  expect(link).toHaveProp('href', `/tasks/${task.id}`);
  expect(link).toHaveProp('className', 'task-link');
});
