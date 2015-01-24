/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TagButton = React.createClass({
    path: function () {
      return '/' + this.props.tag.slug;
    },
    activeButton: function () {
      return this.path() === window.location.pathname;
    },
    className: function () {
      var classString = 'button btn btn-default';
      if (this.activeButton()) {
        classString = classString + ' active';
      }
      if (this.props.current) {
        classString = classString + ' current';
      }
      if (this.props.tag.priority) {
        classString = classString + ' priority-' + this.props.tag.priority + '-btn';
      }
      return classString;
    },
    unfinishedTasksCount: function () {
      return this.props.tag.unfinished_tasks_count;
    },
    render: function () {
      return (
        <div>
          <a href={this.path()} className={this.className()}>
            {this.props.tag.name} ({this.unfinishedTasksCount()})
          </a>
        </div>
      );
    }
  });
})();
