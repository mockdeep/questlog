jest.mock('js/task/bulk_store');
jest.mock('react-router');

import React from 'react';
import {browserHistory} from 'react-router';
import {mount} from 'enzyme';

import BulkTasksNew from 'js/task/containers/bulk_new';
import BulkTaskStore from 'js/task/bulk_store';

describe('BulkTasksNew', () => {
  it('redirects to TaskList on successful save', () => {
    const wrapper = mount(<BulkTasksNew />);
    const fakeThen = jest.fn();

    BulkTaskStore.create.mockReturnValueOnce({then: fakeThen});
    wrapper.setState({taskTitles: 'foobutts'});

    expect(BulkTaskStore.create).not.toHaveBeenCalled();
    wrapper.find('form').simulate('submit');
    expect(BulkTaskStore.create).toHaveBeenCalledWith({titles: 'foobutts'});

    expect(browserHistory.push).not.toHaveBeenCalled();
    fakeThen.mock.calls[0][0]();
    expect(browserHistory.push).toHaveBeenCalledWith('/tasks');
  });
});
