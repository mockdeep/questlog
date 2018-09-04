import React from 'react';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

import TaskShowViewContainer from 'src/task/containers/show_view';

import {makeState, makeTask} from '_test_helpers/factories';

it('wraps the TaskShowView component', () => {
  const task = makeTask({});
  const state = makeState({route: {params: {taskId: task.id}}, task: [task]});
  const props = {store: createStore(() => state)};
  const container = shallow(<TaskShowViewContainer {...props} />);

  expect(container.find('TaskShowView')).toExist();
});
