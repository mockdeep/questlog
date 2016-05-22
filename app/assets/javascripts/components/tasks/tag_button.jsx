'use strict';

const React = require('react');
const Link = require('react-router').Link;

const TagButton = React.createClass({
  propTypes: {
    current: React.PropTypes.bool.isRequired,
    tag: React.PropTypes.object.isRequired
  },

  path: function () {
    return `/${this.props.tag.slug}`;
  },
  activeButton: function () {
    return this.path() === window.location.pathname;
  },
  className: function () {
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
  },
  unfinishedTasksCount: function () {
    return this.props.tag.unfinished_tasks_count;
  },
  render: function () {
    return (
      <div>
        <Link to={this.path()} className={this.className()}>
          {`${this.props.tag.name} (${this.unfinishedTasksCount()})`}
        </Link>
      </div>
    );
  }
});

module.exports = TagButton;
