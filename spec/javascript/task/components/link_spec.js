import React from 'react';
import {shallow} from 'enzyme';

import TaskLink from 'src/task/components/link';

import {makeTask} from '_test_helpers/factories';

const Link = 'Connect(Link)';

it('renders a link to the task', () => {
  const task = makeTask({title: 'my title'});
  const component = shallow(<TaskLink task={task} />);

  const link = component.find(Link);

  expect(link).toHaveProp('children', task.title);
  expect(link).toHaveProp('to', 'showTask');
  expect(link).toHaveProp('className', 'task-link');
  expect(link).toHaveProp('params', {taskId: task.id});
});
