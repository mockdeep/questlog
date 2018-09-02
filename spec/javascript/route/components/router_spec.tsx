import React from 'react';
import {shallow} from 'enzyme';

import Router from 'src/route/components/router';
import ROUTES from 'src/route/routes';

it('can render all of the routes', () => {
  ROUTES.forEach(route => {
    expect(shallow(<Router route={route} />)).toExist();
  });
});

it('renders nothing for server rendered routes', () => {
  const component = shallow(<Router route={{name: 'sessions'}} />);

  expect(component.find('Nothing').dive().type()).toBeNull();
});
