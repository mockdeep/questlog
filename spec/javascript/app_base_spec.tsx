jest.mock('src/_helpers/ajax', () => ({
  ajaxGet() { return {then: jest.fn()}; },
}));
import React from 'react';
import {shallow} from 'enzyme';

import AppBase from 'src/app_base';

it('renders routes', () => {
  const wrapper = shallow(<AppBase />);

  expect(wrapper.find('Connect(Router)')).toExist();
});
