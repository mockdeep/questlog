import React from 'react';
import {shallow} from 'enzyme';

import {makeTask} from '_test_helpers/factories';

import createAppStore from 'src/create_app_store';
import TaskEditTitleForm from 'src/task/containers/edit_title_form';

const props = {store: createAppStore(), task: makeTask()};

it('renders a component', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);

  expect(component.find('TaskEditTitleForm')).toExist();
});
