import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TagButton from 'src/tag/components/tag_button';

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
  currentTagIds: PropTypes.array.isRequired,
  selectedTagSlug: PropTypes.string,
  tags: PropTypes.array.isRequired,
};

export default TagButtons;
