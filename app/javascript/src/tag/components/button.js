import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'src/route/containers/link';
import {tagShape} from 'src/shapes';

class TagButton extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  className() {
    const {current, isActive, priority} = this.props;
    let classString = 'button btn btn-default';

    if (isActive) {
      classString = `${classString} active`;
    }
    if (current) {
      classString = `${classString} current`;
    }
    if (priority) {
      classString = `${classString} priority-${priority}-btn`;
    }

    return classString;
  }

  render() {
    const {tag, unfinishedTasksCount} = this.props;
    const {slug, name} = tag;
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
  tag: tagShape.isRequired,
  unfinishedTasksCount: PropTypes.number.isRequired,
  priority: PropTypes.number,
};

export default TagButton;
