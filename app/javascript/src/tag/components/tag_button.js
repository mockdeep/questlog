import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'src/_common/containers/link';

class TagButton extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  className() {
    let classString = 'button btn btn-default';

    if (this.props.isActive) {
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

  render() {
    const {slug, name, unfinishedTasksCount} = this.props.tag;
    const to = name === 'All' ? 'root' : 'tag';

    return (
      <div>
        <Link to={to} params={{slug}} className={this.className()}>
          {`${name} (${unfinishedTasksCount})`}
        </Link>
      </div>
    );
  }
}

TagButton.propTypes = {
  current: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  tag: PropTypes.object.isRequired,
};

export default TagButton;
