import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TaskShowViewContainer from 'src/task/containers/show_view';

it('wraps the TaskShowView component', () => {
  const props = {store: createAppStore()};
  const container = shallow(<TaskShowViewContainer {...props} />);

  expect(container.find('TaskShowView')).toBePresent();
});
