import React from 'react';
import {shallow} from 'enzyme';

import SessionNewView from 'src/session/components/new_view';

it('renders a login form', () => {
  const component = shallow(<SessionNewView />);

  expect(component.find('input#email')).toExist();
  expect(component.find('input#password')).toExist();
});
