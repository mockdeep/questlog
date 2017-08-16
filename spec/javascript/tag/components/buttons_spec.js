import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import createAppStore from 'src/create_app_store';
import TagButtons from 'src/tag/components/buttons';

const tags = [
  {id: 5, name: 'home', unfinishedTasksCount: 8, slug: 'home'},
  {id: 23, name: 'work', unfinishedTasksCount: 13, slug: 'work'},
];
const props = {task: {}, tags, currentTagIds: []};

describe('TagButtons', () => {
  it('renders some stuff', () => {
    const wrapper = mount(
      <Provider store={createAppStore()}>
        <TagButtons {...props} />
      </Provider>
    );

    expect(wrapper.text()).toContain('home (8)');
    expect(wrapper.text()).toContain('work (13)');
  });
});
