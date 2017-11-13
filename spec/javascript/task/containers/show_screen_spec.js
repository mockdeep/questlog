import React from 'react';
import {shallow} from 'enzyme';

import createAppStore from 'src/create_app_store';
import TaskShowScreenContainer from 'src/task/containers/show_screen';

it('wraps the TaskShowScreen component', () => {
  const props = {store: createAppStore()};
  const container = shallow(<TaskShowScreenContainer {...props} />);

  expect(container.find('TaskShowScreen')).toBePresent();
});
