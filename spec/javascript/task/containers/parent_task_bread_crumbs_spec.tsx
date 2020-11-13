import React from 'react';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

import ParentTaskBreadCrumbsContainer, {ParentTaskBreadCrumbs}
  from 'src/task/containers/parent_task_bread_crumbs';

import {makeState, makeTask} from '_test_helpers/factories';

describe('ParentTaskBreadCrumbs', () => {
  it('renders nothing when there is no task', () => {
    const component = shallow(<ParentTaskBreadCrumbs />);

    expect(component.type()).toBeNull();
  });

  it('renders a link to the task when present', () => {
    const task = makeTask();
    const component = shallow(<ParentTaskBreadCrumbs task={task} />);

    expect(component.find('TaskLink')).toHaveProp('task', task);
  });

  it('renders a parent task link recursively when tree goes deeper', () => {
    const task = makeTask({title: 'some parent', parentTaskId: 5});
    const component = shallow(<ParentTaskBreadCrumbs task={task} />);
    const container = component.find('Connect(ParentTaskBreadCrumbs)');

    expect(container).toHaveProp('taskId', 5);
  });
});

describe('ParentTaskBreadCrumbsContainer', () => {
  it('renders the component with a task when taskId is present', () => {
    const task = makeTask();
    const state = makeState({task: [task]});
    const props = {store: createStore(() => state), taskId: task.id};

    const container = shallow(<ParentTaskBreadCrumbsContainer {...props} />);
    const component = container.find('ParentTaskBreadCrumbs');

    expect(component).toHaveProp('task', task);
  });
});
