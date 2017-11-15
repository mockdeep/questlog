import React from 'react';
import {shallow} from 'enzyme';

import WhatView from 'src/static/components/what_view';

it('renders the What page', () => {
  const component = shallow(<WhatView />);

  expect(component).toIncludeText('What\'s a Questlog?');
});
