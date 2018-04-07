import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TaskEditTitleForm from 'src/task/containers/edit_title_form';

const props = {store: createAppStore(), task: {}};

it('renders a scratch component', () => {
  const component = shallow(<TaskEditTitleForm {...props} />);

  expect(component.find('Scratch(TaskEditTitleForm)')).toExist();
});
