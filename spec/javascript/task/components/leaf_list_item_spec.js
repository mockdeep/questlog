import React from 'react';
import {shallow} from 'enzyme';

import TaskLeafListItem from 'src/task/components/leaf_list_item';

import {makeTask} from '_test_helpers/factories';

const props = {
  task: makeTask({title: 'some title'}),
};

it('renders the task title', () => {
  const component = shallow(<TaskLeafListItem {...props} />);

  expect(component).toHaveText('some title');
});
