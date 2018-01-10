import React from 'react';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

import TaskShowViewContainer from 'src/task/containers/show_view';

it('wraps the TaskShowView component', () => {
  const state = {route: {params: {taskId: 5}}, task: {byId: {5: {}}}};
  const props = {store: createStore(() => state)};
  const container = shallow(<TaskShowViewContainer {...props} />);

  expect(container.find('TaskShowView')).toBePresent();
});
