import React from 'react';
import {shallow} from 'enzyme';

import FocusViewContainer from 'src/task/containers/focus_view';
import createAppStore from 'src/create_app_store';

const props = {store: createAppStore(), match: {params: {}}};

it('wraps the Item component with Scratch', () => {
  const container = shallow(<FocusViewContainer {...props} />);

  expect(container.find('Scratch(FocusView)')).toBePresent();
});
