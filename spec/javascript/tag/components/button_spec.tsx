import React from 'react';
import {shallow} from 'enzyme';

import type {Props} from 'src/tag/components/button';
import TagButton from 'src/tag/components/button';

import {makeTag} from '_test_helpers/factories';

const tag = makeTag({slug: 'home', name: 'Home'});
const props: Props = {
  current: false,
  tag,
  isActive: false,
};

it('adds an active class when tag is selected', () => {
  const component = shallow(<TagButton {...props} isActive />);

  expect(component.find('a')).toHaveClassName('active');
});

it('adds a current class when tag current', () => {
  const component = shallow(<TagButton {...props} current />);

  expect(component.find('a')).toHaveClassName('current');
});

it('adds a priority class when tag has a priority', () => {
  const overrides = {tag: {...tag, priority: 2}};
  const component = shallow(<TagButton {...props} {...overrides} />);

  expect(component.find('a')).toHaveClassName('priority-2-btn');
});

it('renders a link with a path for a tag', () => {
  const component = shallow(<TagButton {...props} />);

  const link = component.find('a');

  expect(link).toHaveProp('href', '/tags/home');
});

it('renders a link with the root path when name is "All"', () => {
  const overrides = {tag: {...tag, name: 'All', slug: ''}};
  const component = shallow(<TagButton {...props} {...overrides} />);

  const link = component.find('a');

  expect(link).toHaveProp('href', '/');
});
