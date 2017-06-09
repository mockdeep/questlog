import React from 'react';
import {shallow} from 'enzyme';

import ItemComponent from 'src/task/components/item';
import ItemContainer from 'src/task/containers/item';
import store from 'src/app_store';

const renderOpts = {lifecycleExperimental: true};
const props = {store};

it('wraps the Item component', () => {
  const container = shallow(<ItemContainer {...props} />, renderOpts);

  expect(container.find(ItemComponent)).toHaveLength(1);
});
