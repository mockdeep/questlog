import React from 'react';
import {createStore} from 'redux';
import {shallow} from 'enzyme';

import LinkContainer from 'src/route/containers/link';

import {makeState} from '_test_helpers/factories';

it('wraps the Link component', () => {
  const state = makeState({route: {name: 'fooRoute'}});
  const props = {store: createStore(() => state), to: 'wherever'};

  const container = shallow(<LinkContainer {...props}>{'text'}</LinkContainer>);

  const link = container.find('Link');
  expect(link).toBePresent();
  expect(link).toHaveProp('routeName', 'fooRoute');
  expect(link).toHaveProp('children', 'text');
});
