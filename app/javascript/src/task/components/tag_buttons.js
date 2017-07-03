import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import TagButton from 'src/task/components/tag_button';

class TagButtons extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  isCurrent(tag) {
    return this.currentNames().some(function tagNameMatches(name) {
      return tag.name === name;
    });
  }

  tagButtons() {
    return this.props.tags.map(this.tagButton);
  }

  isActive(tag) {
    return window.location.pathname === `/${tag.slug}`;
  }

  tagButton(tag) {
    return (
      <TagButton
        tag={tag}
        key={tag.id}
        current={this.isCurrent(tag)}
        isActive={this.isActive(tag)}
        updateTagMeta={this.props.updateTagMeta}
      />
    );
  }

  currentNames() {
    return this.props.task.tagNames || [];
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
  tags: PropTypes.array.isRequired,
  task: PropTypes.object.isRequired,
  updateTagMeta: PropTypes.func.isRequired,
};

export default TagButtons;
