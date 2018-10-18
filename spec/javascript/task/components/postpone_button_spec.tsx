import React from 'react';
import {shallow} from 'enzyme';

import PostponeButton from 'src/task/components/postpone_button';

const props = {
  disabled: false,
  postponeTask: jest.fn(),
  storePostponeSeconds: jest.fn(),
  task: {},
};

it('renders a select tag', () => {
  const component = shallow(<PostponeButton {...props} />);

  expect(component.find('select')).toHaveLength(1);
});
