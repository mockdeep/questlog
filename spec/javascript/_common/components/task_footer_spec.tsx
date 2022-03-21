import React from 'react';
import {shallow} from 'enzyme';

import TaskFooter from 'src/_common/components/task_footer';

it('renders a footer with useful links', () => {
  const component = shallow(<TaskFooter />);
  const links = component.find('a');

  expect(links).toHaveLength(3);

  const link = links.at(0);

  expect(link).toHaveProp('href', '/bulk_task/new');
  expect(link.children()).toHaveText('Add multiple tasks');
});
