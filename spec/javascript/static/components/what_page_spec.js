import React from 'react';
import {shallow} from 'enzyme';

import WhatPage from 'src/static/components/what_page';

it('renders the What page', () => {
  const component = shallow(<WhatPage />);

  expect(component.text()).toMatch(/What's a Questlog?/);
});
