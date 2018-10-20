import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TagButton from 'src/tag/components/button';
import {tagShape} from 'src/shapes';

export type Props = {
  currentTagIds: number[],
  tags: Tag[],
  selectedTagSlug?: string,
};

class TagButtons extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  isCurrent(tag: Tag) {
    const {currentTagIds} = this.props;

    return currentTagIds.includes(tag.id);
  }

  isActive(tag: Tag) {
    const {selectedTagSlug} = this.props;

    if (selectedTagSlug) { return tag.slug === selectedTagSlug; }

    return tag.name === 'All';
  }

  tagButtons() {
    const {tags} = this.props;

    return tags.map(this.tagButton);
  }

  tagButton(tag: Tag) {
    return (
      <TagButton
        tag={tag}
        key={tag.id}
        current={this.isCurrent(tag)}
        isActive={this.isActive(tag)}
      />
    );
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-12 tag-buttons'>{this.tagButtons()}</div>
      </div>
    );
  }
}

TagButtons.propTypes = {
  currentTagIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  tags: PropTypes.arrayOf(tagShape).isRequired,
  selectedTagSlug: PropTypes.string,
};

export default TagButtons;
