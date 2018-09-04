jest.mock('src/task/bulk_store');

import React from 'react';
import {mount} from 'enzyme';

import TaskBulkAddView from 'src/task/components/bulk_add_view';
import BulkTaskStore from 'src/task/bulk_store';

const setRoute = jest.fn();
const props = {setRoute, taskTitles: 'foobutts', updateTaskMeta: jest.fn()};

it('redirects to TaskList on successful save', () => {
  const wrapper = mount(<TaskBulkAddView {...props} />);
  const fakeThen = jest.fn();

  (BulkTaskStore.create as jest.Mock).mockReturnValueOnce({then: fakeThen});

  expect(BulkTaskStore.create).not.toHaveBeenCalled();
  wrapper.find('form').simulate('submit');
  expect(BulkTaskStore.create).toHaveBeenCalledWith({titles: 'foobutts'});

  expect(setRoute).not.toHaveBeenCalled();
  fakeThen.mock.calls[0][0]();
  expect(setRoute).toHaveBeenCalledWith({name: 'tasks'});
});
