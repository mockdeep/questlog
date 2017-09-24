import React from 'react';
import {shallow} from 'enzyme';

import ItemContainer from 'src/task/containers/item';
import createAppStore from 'src/create_app_store';

const renderOpts = {lifecycleExperimental: true};
const props = {store: createAppStore(), match: {params: {}}};

it('wraps the Item component with Scratch', () => {
  const container = shallow(<ItemContainer {...props} />, renderOpts);

  expect(container.find('Scratch(TaskItem)')).toBePresent();
});
