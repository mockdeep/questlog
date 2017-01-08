'use strict';

import React from 'react';
import {mount} from 'enzyme';

import TagButtons from 'js/task/components/tag_buttons';

const tags = [
  {id: 5, name: 'home', unfinished_tasks_count: 8},
  {id: 23, name: 'work', unfinished_tasks_count: 13}
];
const task = {};

describe('TagButtons', () => {
  it('renders some stuff', () => {
    const wrapper = mount(<TagButtons task={task} tags={tags}/>);

    expect(wrapper.text()).toContain('home (8)');
    expect(wrapper.text()).toContain('work (13)');
  });
});
