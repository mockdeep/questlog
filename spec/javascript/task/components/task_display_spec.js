import React from 'react';
import {shallow} from 'enzyme';

import TagButtons from 'src/tag/components/tag_buttons';
import TaskDisplay from 'src/task/components/task_display';

const props = {
  completeTask: jest.fn(),
  deleteTask: jest.fn(),
  disabled: false,
  postponeTask: jest.fn(),
  storePostponeSeconds: jest.fn(),
  storeTask: jest.fn(),
  tags: [],
  task: {},
};

it('renders TagButtons', () => {
  const component = shallow(
    <TaskDisplay {...props} />,
    {lifecycleExperimental: true}
  );
  const tagButtons = component.find(TagButtons);

  expect(tagButtons.prop('task')).toBe(props.task);
});
