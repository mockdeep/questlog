import React from 'react';
import {shallow} from 'enzyme';

import NewSessionForm from 'src/session/components/new_form';

it('renders a login form', () => {
  const component = shallow(<NewSessionForm />);

  expect(component.find('input#email')).toBePresent();
  expect(component.find('input#password')).toBePresent();
});
