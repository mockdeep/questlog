import React from 'react';
import {shallow} from 'enzyme';

import NewSessionForm from 'src/session/components/new_form';

it('renders a login form', () => {
  const component = shallow(<NewSessionForm />);

  expect(component.find('input#email')).toHaveLength(1);
  expect(component.find('input#password')).toHaveLength(1);
});
