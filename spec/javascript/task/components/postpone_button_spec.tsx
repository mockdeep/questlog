import React from 'react';
import {shallow} from 'enzyme';

import {makeTask} from '_test_helpers/factories';

import type {Props} from 'src/task/components/postpone_button';
import PostponeButton from 'src/task/components/postpone_button';

const props: Props = {
  disabled: false,
  postponeTask: jest.fn(),
  storePostponeSeconds: jest.fn(),
  task: makeTask(),
};

it('renders a select tag', () => {
  const component = shallow(<PostponeButton {...props} />);

  expect(component.find('select')).toHaveLength(1);
});
