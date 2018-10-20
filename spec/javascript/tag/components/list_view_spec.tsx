import React from 'react';
import {shallow} from 'enzyme';

import TagListView from 'src/tag/components/list_view';

import {makeTag} from '_test_helpers/factories';

const props = {
  tags: [
    makeTag({name: 'At Home', slug: 'at-home'}),
    makeTag({name: 'At Work', slug: 'at-work'}),
  ],
};

it('renders tag rows', () => {
  const component = shallow(<TagListView {...props} />);
  const tagRows = component.find('.tag-row');

  expect(tagRows).toHaveLength(2);

  const tagRow1 = tagRows.at(0);
  const tagRow2 = tagRows.at(1);

  expect(tagRow1).toIncludeText('At Home');
  expect(tagRow1.find('Connect(Link)')).toHaveProp('params', {slug: 'at-home'});
  expect(tagRow2).toIncludeText('At Work');
  expect(tagRow2.find('Connect(Link)')).toHaveProp('params', {slug: 'at-work'});
});

it('does not render the "All" tag', () => {
  const tags = [makeTag({name: 'All', slug: ''})];
  const component = shallow(<TagListView {...props} tags={tags} />);

  expect(component.find('.tag-row')).not.toExist();
});
