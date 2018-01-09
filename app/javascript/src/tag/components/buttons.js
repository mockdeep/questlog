import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import grab from 'src/_helpers/grab';
import TagButton from 'src/tag/components/button';
import {tagShape} from 'src/shapes';

class TagButtons extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  isCurrent(tag) {
    const {currentTagIds} = this.props;

    return currentTagIds.includes(tag.id);
  }

  isActive(tag) {
    const {selectedTagSlug} = this.props;

    if (selectedTagSlug) { return tag.slug === selectedTagSlug; }

    return tag.name === 'All';
  }

  tagButtons() {
    const {tags} = this.props;

    return tags.map(this.tagButton);
  }

  tagButton(tag) {
    const {tagMetaInfo} = this.props;
    const {priority, unfinishedTasksCount} = grab(tagMetaInfo, tag.id);

    return (
      <TagButton
        tag={tag}
        key={tag.id}
        current={this.isCurrent(tag)}
        isActive={this.isActive(tag)}
        priority={priority}
        unfinishedTasksCount={unfinishedTasksCount}
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
  tagMetaInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  tags: PropTypes.arrayOf(tagShape).isRequired,
  selectedTagSlug: PropTypes.string,
};

export default TagButtons;
