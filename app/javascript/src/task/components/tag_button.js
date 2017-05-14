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

  unfinishedTasksCount() {
    return this.props.tag.unfinishedTasksCount;
  }

  render() {
    return (
      <div>
        <Link to={this.path()} className={this.className()}>
          {`${this.props.tag.name} (${this.unfinishedTasksCount()})`}
        </Link>
      </div>
    );
  }
}

TagButton.propTypes = {
  current: PropTypes.bool.isRequired,
  tag: PropTypes.object.isRequired,
};

export default TagButton;
