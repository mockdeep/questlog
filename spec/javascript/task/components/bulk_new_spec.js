jest.mock('src/task/bulk_store');
jest.mock('react-router');

import React from 'react';
import {mount} from 'enzyme';

import BulkTasksNew from 'src/task/components/bulk_new';
import BulkTaskStore from 'src/task/bulk_store';

describe('BulkTasksNew', () => {
  it('redirects to TaskList on successful save', () => {
    const history = {push: jest.fn()};
    const wrapper = mount(<BulkTasksNew history={history} />);
    const fakeThen = jest.fn();

    BulkTaskStore.create.mockReturnValueOnce({then: fakeThen});
    wrapper.setState({taskTitles: 'foobutts'});

    expect(BulkTaskStore.create).not.toHaveBeenCalled();
    wrapper.find('form').simulate('submit');
    expect(BulkTaskStore.create).toHaveBeenCalledWith({titles: 'foobutts'});

    expect(history.push).not.toHaveBeenCalled();
    fakeThen.mock.calls[0][0]();
    expect(history.push).toHaveBeenCalledWith('/tasks');
  });
});
