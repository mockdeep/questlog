import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

class TagButton extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  path() {
    return `/${this.props.tag.slug}`;
  }

  activeButton() {
    return this.path() === window.location.pathname;
  }

  isTagSelected() {
    return this.props.selectedTagId === this.props.tag.id;
  }

  className() {
    let classString = 'button btn btn-default';

    if (this.activeButton()) {
      classString = `${classString} active`;
    }
    if (this.props.current) {
      classString = `${classString} current`;
    }
    if (this.props.tag.priority) {
      classString = `${classString} priority-${this.props.tag.priority}-btn`;
    }

    return classString;
  }

  toggleTagSelection() {
    const selectedTagId = this.isTagSelected() ? null : this.props.tag.id;

    this.props.updateTagMeta({selectedTagId});
  }

  unfinishedTasksCount() {
    return this.props.tag.unfinishedTasksCount;
  }

  render() {
    return (
      <div>
        <Link
          to={this.path()}
          className={this.className()}
          onClick={this.toggleTagSelection}
        >
          {`${this.props.tag.name} (${this.unfinishedTasksCount()})`}
        </Link>
      </div>
    );
  }
}

TagButton.propTypes = {
  current: PropTypes.bool.isRequired,
  selectedTagId: PropTypes.number,
  tag: PropTypes.object.isRequired,
  updateTagMeta: PropTypes.func.isRequired,
};

export default TagButton;
