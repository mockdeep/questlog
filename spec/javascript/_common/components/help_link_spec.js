import React from 'react';
import {shallow} from 'enzyme';

import HelpLink from 'src/_common/components/help_link';

const renderOpts = {lifecycleExperimental: true};

it('renders a link to the help dialog', () => {
  const component = shallow(<HelpLink />, renderOpts);

  expect(component.text()).toBe('Help');
  expect(component.prop('data-target')).toBe('#tips-modal');
});
