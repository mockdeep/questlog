import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TagButton from 'src/tag/components/button';
import {tagShape} from 'src/shapes';

class TagButtons extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  isCurrent(tag) {
    return this.props.currentTagIds.includes(tag.id);
  }

  isActive(tag) {
    if (this.props.selectedTagSlug) {
      return tag.slug === this.props.selectedTagSlug;
    }

    return tag.name === 'All';
  }

  tagButtons() {
    return this.props.tags.map(this.tagButton);
  }

  tagButton(tag) {
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
        <div className='col-md-12 tag-buttons'>
          {this.tagButtons()}
        </div>
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
