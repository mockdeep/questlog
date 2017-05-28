import React from 'react';
import {shallow} from 'enzyme';

import TagButtons from 'src/task/components/tag_buttons';
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
  updateTagMeta: jest.fn(),
};

it('renders TagButtons', () => {
  const component = shallow(<TaskDisplay {...props} />);
  const tagButtons = component.find(TagButtons);

  expect(tagButtons.prop('updateTagMeta')).toBe(props.updateTagMeta);
});
