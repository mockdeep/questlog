import React from 'react';
import {shallow} from 'enzyme';

import PrivaceyPage from 'src/static/components/privacy_page';

it('renders the privacy page', () => {
  const component = shallow(<PrivaceyPage />);

  expect(component).toIncludeText('I won\'t sell your data');
});
