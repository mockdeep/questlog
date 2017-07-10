import React from 'react';
import {shallow} from 'enzyme';

import Link from 'src/_common/containers/link';
import TagButton from 'src/tag/components/tag_button';

const tag = {slug: 'home', unfinishedTasksCount: 5, id: 2, name: 'Home'};
const props = {current: false, updateTagMeta: jest.fn(), tag, isActive: false};

it('adds an active class when tag is selected', () => {
  const component = shallow(
    <TagButton {...props} isActive />,
    {lifecycleExperimental: true}
  );

  expect(component.find(Link).hasClass('active')).toBe(true);
});

it('passes routing params to Link sub-component', () => {
  const component = shallow(
    <TagButton {...props} />,
    {lifecycleExperimental: true}
  );

  const {to, params} = component.find(Link).props();

  expect(to).toBe('tag');
  expect(params).toEqual({slug: 'home'});
});
