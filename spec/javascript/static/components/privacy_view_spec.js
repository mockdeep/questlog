import React from 'react';
import {shallow} from 'enzyme';

import PrivaceyView from 'src/static/components/privacy_view';

it('renders the privacy page', () => {
  const component = shallow(<PrivaceyView />);

  expect(component).toIncludeText('I won\'t sell your data');
});
