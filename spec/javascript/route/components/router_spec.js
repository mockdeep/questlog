import React from 'react';
import {shallow} from 'enzyme';

import Router from 'src/route/components/router';
import ROUTES from 'src/route/routes';

it('can render all of the routes', () => {
  ROUTES.forEach((route) => {
    shallow(<Router route={route} />);
  });
});
