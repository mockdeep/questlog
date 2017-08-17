import React from 'react';
import {shallow} from 'enzyme';

import TaskFooter from 'src/_common/components/task_footer';

const renderOpts = {lifecycleExperimental: true};

it('renders a footer with useful links', () => {
  const component = shallow(<TaskFooter />, renderOpts);
  const links = component.find('Connect(Link)');

  expect(links).toHaveLength(2);

  const link1 = links.at(0);
  const link2 = links.at(1);

  expect(link1.prop('to')).toBe('tasks');
  expect(link1.children().text()).toBe('All my tasks');
  expect(link2.prop('to')).toBe('timeframes');
  expect(link2.children().text()).toBe('Timeframes');

  expect(component.find('HelpLink')).toHaveLength(2);
});
