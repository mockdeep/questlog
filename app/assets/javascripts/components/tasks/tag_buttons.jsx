'use strict';

var React = require('react');
var any = require('lodash').any;

var TagButton = require('components/tasks/tag_button');

var TagButtons = React.createClass({
  propTypes: {
    tags: React.PropTypes.array.isRequired,
    task: React.PropTypes.object.isRequired
  },

  isCurrent: function (tag) {
    return any(this.currentNames(), function (name) {
      return tag.name === name
    });
  },
  tagButtons: function () {
    return this.props.tags.map(this.tagButton);
  },
  tagButton: function (tag) {
    return (
      <TagButton tag={tag} key={tag.id} current={this.isCurrent(tag)} />
    );
  },
  currentNames: function () {
    return this.props.task.tag_names;
  },
  render: function () {
    return (
      <div className='row'>
        <div className='col-md-12 tag-buttons'>
          {this.tagButtons()}
        </div>
      </div>
    );
  }
});

module.exports = TagButtons;
