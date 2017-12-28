import React from 'react';
import {shallow} from 'enzyme';

import TaskDisplay from 'src/task/components/task_display';

const task = {tagIds: [1]};
const props = {
  completeTask: jest.fn(),
  deleteTask: jest.fn(),
  disabled: false,
  postponeTask: jest.fn(),
  storePostponeSeconds: jest.fn(),
  tags: [],
  task,
  updateTask: jest.fn(),
};

it('renders TagButtons', () => {
  const component = shallow(<TaskDisplay {...props} />);
  const tagButtonsContainer = component.find('Connect(TagButtons)');

  expect(tagButtonsContainer).toHaveProp('currentTagIds', task.tagIds);
});
