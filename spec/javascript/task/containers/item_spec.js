import React from 'react';
import {shallow} from 'enzyme';

import ItemContainer from 'src/task/containers/item';
import store from 'src/app_store';

const renderOpts = {lifecycleExperimental: true};
const props = {store, match: {params: {}}};

it('wraps the Item component', () => {
  const container = shallow(<ItemContainer {...props} />, renderOpts);

  expect(container.find('TaskItem')).toHaveLength(1);
});
