import React from 'react';
import {shallow} from 'enzyme';

import NewSession from 'src/session/components/new';

it('renders a login form', () => {
  const component = shallow(<NewSession />);

  expect(component.find('input#email')).toHaveLength(1);
  expect(component.find('input#password')).toHaveLength(1);
});
