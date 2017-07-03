import React from 'react';
import {shallow} from 'enzyme';

import Link from 'src/_common/containers/link';
import TagButton from 'src/task/components/tag_button';

const tag = {slug: 'home', unfinishedTasksCount: 5, id: 2, name: 'Home'};
const props = {current: false, updateTagMeta: jest.fn(), tag, isActive: false};

describe('onClick', () => {
  it('marks the tag as selected when not', () => {
    const component = shallow(
      <TagButton {...props} />,
      {lifecycleExperimental: true}
    );

    component.find(Link).simulate('click');

    expect(props.updateTagMeta).toHaveBeenCalledWith({selectedTagId: tag.id});
  });

  it('sets selectedTagId to null when tag is selected', () => {
    const component = shallow(
      <TagButton {...props} selectedTagId={tag.id} />,
      {lifecycleExperimental: true}
    );

    component.find(Link).simulate('click');

    expect(props.updateTagMeta).toHaveBeenCalledWith({selectedTagId: null});
  });
});
