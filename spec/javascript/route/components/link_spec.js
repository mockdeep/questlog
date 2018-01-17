import React from 'react';
import {shallow} from 'enzyme';

import Link from 'src/route/components/link';

const props = {
  to: 'root',
  routeName: 'whatever',
  setRoute: jest.fn(),
};

it('renders an anchor tag', () => {
  const component = shallow(<Link {...props}>{'texty text'}</Link>);

  expect(component.find('a')).toHaveProp('children', 'texty text');
});
