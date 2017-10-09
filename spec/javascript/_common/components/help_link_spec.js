import React from 'react';
import {shallow} from 'enzyme';

import HelpLink from 'src/_common/components/help_link';

const renderOpts = {lifecycleExperimental: true};
const props = {helpModalOpen: false, updateCommon: jest.fn()};

it('renders a link to the help dialog', () => {
  const component = shallow(<HelpLink {...props} />, renderOpts);

  expect(component).toIncludeText('Help');
  expect(component.find('HelpModal')).toBePresent();
});
