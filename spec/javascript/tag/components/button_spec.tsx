import React from 'react';
import {shallow} from 'enzyme';

import TagButton, {Props} from 'src/tag/components/button';

import {makeTag} from '_test_helpers/factories';

const tag = makeTag({slug: 'home', name: 'Home'});
const props: Props = {
  current: false,
  tag,
  isActive: false,
};

it('adds an active class when tag is selected', () => {
  const component = shallow(<TagButton {...props} isActive />);

  expect(component.find('Connect(Link)')).toHaveClassName('active');
});

it('adds a current class when tag current', () => {
  const component = shallow(<TagButton {...props} current />);

  expect(component.find('Connect(Link)')).toHaveClassName('current');
});

it('adds a priority class when tag has a priority', () => {
  const overrides = {tag: {...tag, priority: 2}};
  const component = shallow(<TagButton {...props} {...overrides} />);

  expect(component.find('Connect(Link)')).toHaveClassName('priority-2-btn');
});

it('passes routing params to Link sub-component', () => {
  const component = shallow(<TagButton {...props} />);

  const link = component.find('Connect(Link)');

  expect(link).toHaveProp('to', 'tag');
  expect(link).toHaveProp('params', {slug: 'home'});
});

it('passes root routing params to Link sub-component when tag is "All"', () => {
  const overrides = {tag: {...tag, name: 'All', slug: ''}};
  const component = shallow(<TagButton {...props} {...overrides} />);

  const link = component.find('Connect(Link)');

  expect(link).toHaveProp('to', 'root');
  expect(link).toHaveProp('params', {slug: ''});
});
