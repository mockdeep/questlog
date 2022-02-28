jest.mock('src/task/bulk_store');

import React from 'react';
import {mount} from 'enzyme';

import TaskBulkAddView from 'src/task/components/bulk_add_view';

const props = {taskTitles: 'foobutts', updateTaskMeta: jest.fn()};

it('renders a bulk form', () => {
  const wrapper = mount(<TaskBulkAddView {...props} />);

  expect(wrapper.find('form')).toHaveLength(1);
});
