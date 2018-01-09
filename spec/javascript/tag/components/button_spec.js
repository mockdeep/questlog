import React from 'react';
import {shallow} from 'enzyme';

import TagButton from 'src/tag/components/button';

const tag = {slug: 'home', id: 2, name: 'Home'};
const props = {
  current: false,
  updateTagMeta: jest.fn(),
  tag,
  isActive: false,
  unfinishedTasksCount: 5,
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
  const component = shallow(<TagButton {...props} priority={2} />);

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
