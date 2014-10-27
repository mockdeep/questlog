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
      var classString = 'button btn';
      if (this.activeButton()) {
        classString = classString + ' active';
      }
      if (this.props.current) {
        classString = classString + ' current';
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
