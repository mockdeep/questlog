import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import createAppStore from 'src/create_app_store';
import TagButtons from 'src/tag/components/buttons';

import {makeTag, makeTask} from '_test_helpers/factories';

const tags = [
  makeTag({name: 'home', slug: 'home', tasks: [makeTask()]}),
  makeTag({name: 'work', slug: 'work', tasks: [makeTask(), makeTask()]}),
];
const props = {task: {}, tags, currentTagIds: []};

it('renders tag buttons', () => {
  const provider =
    <Provider store={createAppStore()}>
      <TagButtons {...props} />
    </Provider>;
  const wrapper = mount(provider);

  expect(wrapper).toIncludeText('home (1)');
  expect(wrapper).toIncludeText('work (2)');
});

it('passes down active when tag slug matches the selected tag slug', () => {
  const provider =
    <Provider store={createAppStore()}>
      <TagButtons {...props} selectedTagSlug={'work'} />
    </Provider>;
  const wrapper = mount(provider);

  expect(wrapper.find('TagButton').at(0)).toHaveProp('isActive', false);
  expect(wrapper.find('TagButton').at(1)).toHaveProp('isActive', true);
});
