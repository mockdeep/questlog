import React from 'react';
import {shallow} from 'enzyme';

import SelectOption from 'src/_common/components/select_option';

const props = {value: 'my value', content: 'my content'};

it('renders an option with the given value and content', () => {
  const component = shallow(<SelectOption {...props} />);

  const option = component.find('option');
  expect(option).toHaveValue('my value');
  expect(option).toHaveText('my content');
});
