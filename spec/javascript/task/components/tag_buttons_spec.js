import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {mount} from 'enzyme';

import TagButtons from 'src/task/components/tag_buttons';

const tags = [
  {id: 5, name: 'home', unfinishedTasksCount: 8},
  {id: 23, name: 'work', unfinishedTasksCount: 13},
];
const props = {task: {}, tags, updateTagMeta: jest.fn()};

describe('TagButtons', () => {
  it('renders some stuff', () => {
    const wrapper = mount(
      <BrowserRouter>
        <TagButtons {...props} />
      </BrowserRouter>
    );

    expect(wrapper.text()).toContain('home (8)');
    expect(wrapper.text()).toContain('work (13)');
  });
});
