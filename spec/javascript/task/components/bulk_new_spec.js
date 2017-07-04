jest.mock('src/task/bulk_store');
jest.mock('react-router');

import React from 'react';
import {mount} from 'enzyme';

import BulkTasksNew from 'src/task/components/bulk_new';
import BulkTaskStore from 'src/task/bulk_store';

describe('BulkTasksNew', () => {
  it('redirects to TaskList on successful save', () => {
    const setRoute = jest.fn();
    const wrapper = mount(<BulkTasksNew setRoute={setRoute} />);
    const fakeThen = jest.fn();

    BulkTaskStore.create.mockReturnValueOnce({then: fakeThen});
    wrapper.setState({taskTitles: 'foobutts'});

    expect(BulkTaskStore.create).not.toHaveBeenCalled();
    wrapper.find('form').simulate('submit');
    expect(BulkTaskStore.create).toHaveBeenCalledWith({titles: 'foobutts'});

    expect(setRoute).not.toHaveBeenCalled();
    fakeThen.mock.calls[0][0]();
    expect(setRoute).toHaveBeenCalledWith({name: 'tasks'});
  });
});
