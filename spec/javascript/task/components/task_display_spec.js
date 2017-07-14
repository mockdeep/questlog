import React from 'react';
import {shallow} from 'enzyme';

import TagButtonsContainer from 'src/tag/containers/buttons';
import TaskDisplay from 'src/task/components/task_display';

const props = {
  completeTask: jest.fn(),
  deleteTask: jest.fn(),
  disabled: false,
  postponeTask: jest.fn(),
  storePostponeSeconds: jest.fn(),
  storeTask: jest.fn(),
  tags: [],
  task: {tagIds: [1]},
};

it('renders TagButtons', () => {
  const component = shallow(
    <TaskDisplay {...props} />,
    {lifecycleExperimental: true}
  );
  const tagButtonsContainer = component.find(TagButtonsContainer);

  expect(tagButtonsContainer.prop('currentTagIds')).toBe(props.task.tagIds);
});
