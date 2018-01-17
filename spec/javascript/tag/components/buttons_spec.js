import React from 'react';
import {shallow} from 'enzyme';

import TagButtons from 'src/tag/components/buttons';

import {makeTag, makeTask} from '_test_helpers/factories';

const tags = [
  makeTag({name: 'home', slug: 'home', tasks: [makeTask()]}),
  makeTag({name: 'work', slug: 'work', tasks: [makeTask(), makeTask()]}),
];
const props = {task: {}, tags, currentTagIds: []};

it('renders tag buttons', () => {
  const component = shallow(<TagButtons {...props} />);

  expect(component.find('TagButton').at(0)).toHaveProp('tag', tags[0]);
  expect(component.find('TagButton').at(1)).toHaveProp('tag', tags[1]);
});

it('passes down active when tag slug matches the selected tag slug', () => {
  const component = shallow(<TagButtons {...props} selectedTagSlug={'work'} />);

  expect(component.find('TagButton').at(0)).toHaveProp('isActive', false);
  expect(component.find('TagButton').at(1)).toHaveProp('isActive', true);
});
