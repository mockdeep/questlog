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
    const tagIds = this.props.task.tagIds || [];

    return tagIds.some((tagId) => tagId === tag.id);
  }

  isActive(tag) {
    if (this.props.activeTagSlug) {
      return tag.slug === this.props.activeTagSlug;
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
  activeTagSlug: PropTypes.string,
  tags: PropTypes.array.isRequired,
  task: PropTypes.object.isRequired,
};

export default TagButtons;
