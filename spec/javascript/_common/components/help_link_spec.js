import React from 'react';
import {shallow} from 'enzyme';

import HelpLink from 'src/_common/components/help_link';

const props = {helpModalOpen: false, updateCommon: jest.fn()};

it('renders a link to the help dialog', () => {
  const component = shallow(<HelpLink {...props} />);

  expect(component).toIncludeText('Help');
  expect(component.find('HelpModal')).toBePresent();
});
