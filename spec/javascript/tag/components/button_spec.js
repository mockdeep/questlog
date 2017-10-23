import React from 'react';
import {shallow} from 'enzyme';

import TagButton from 'src/tag/components/button';

const tag = {slug: 'home', unfinishedTasksCount: 5, id: 2, name: 'Home'};
const props = {current: false, updateTagMeta: jest.fn(), tag, isActive: false};

it('adds an active class when tag is selected', () => {
  const component = shallow(<TagButton {...props} isActive />);

  expect(component.find('Connect(Link)')).toHaveClassName('active');
});

it('passes routing params to Link sub-component', () => {
  const component = shallow(<TagButton {...props} />);

  const link = component.find('Connect(Link)');

  expect(link).toHaveProp('to', 'tag');
  expect(link).toHaveProp('params', {slug: 'home'});
});
