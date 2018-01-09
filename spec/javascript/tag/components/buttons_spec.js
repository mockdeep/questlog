import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import createAppStore from 'src/create_app_store';
import TagButtons from 'src/tag/components/buttons';

const tags = [
  {id: 5, name: 'home', slug: 'home'},
  {id: 23, name: 'work', slug: 'work'},
];
const tagMetaInfo = {
  5: {unfinishedTasksCount: 8},
  23: {unfinishedTasksCount: 13},
};
const props = {task: {}, tags, currentTagIds: [], tagMetaInfo};

describe('TagButtons', () => {
  it('renders some stuff', () => {
    const provider =
      <Provider store={createAppStore()}>
        <TagButtons {...props} />
      </Provider>;
    const wrapper = mount(provider);

    expect(wrapper).toIncludeText('home (8)');
    expect(wrapper).toIncludeText('work (13)');
  });
});
