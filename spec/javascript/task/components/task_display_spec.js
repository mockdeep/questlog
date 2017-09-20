import React from 'react';
import {shallow} from 'enzyme';

import TaskDisplay from 'src/task/components/task_display';

const props = {
  completeTask: jest.fn(),
  deleteTask: jest.fn(),
  disabled: false,
  postponeTask: jest.fn(),
  storePostponeSeconds: jest.fn(),
  tags: [],
  task: {tagIds: [1]},
  updateTask: jest.fn(),
};

it('renders TagButtons', () => {
  const component = shallow(
    <TaskDisplay {...props} />,
    {lifecycleExperimental: true}
  );
  const tagButtonsContainer = component.find('Connect(TagButtons)');

  expect(tagButtonsContainer.prop('currentTagIds')).toBe(props.task.tagIds);
});
