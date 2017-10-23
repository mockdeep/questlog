import React from 'react';
import {shallow} from 'enzyme';

import ItemContainer from 'src/task/containers/item';
import createAppStore from 'src/create_app_store';

const props = {store: createAppStore(), match: {params: {}}};

it('wraps the Item component with Scratch', () => {
  const container = shallow(<ItemContainer {...props} />);

  expect(container.find('Scratch(TaskItem)')).toBePresent();
});
