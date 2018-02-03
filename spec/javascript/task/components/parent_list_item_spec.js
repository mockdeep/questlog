import React from 'react';
import {shallow} from 'enzyme';

import TaskParentListItem from 'src/task/components/parent_list_item';

import {makeTask} from '_test_helpers/factories';

const task = makeTask({title: 'foo title'});
const props = {
  task,
  tasksByParentId: {[task.id]: []},
};

it('renders the task title', () => {
  const component = shallow(<TaskParentListItem {...props} />);

  expect(component).toIncludeText('foo title');
});

it('renders a new nested list', () => {
  const component = shallow(<TaskParentListItem {...props} />);

  expect(component.find('TaskNestedList')).toHaveLength(1);
});
