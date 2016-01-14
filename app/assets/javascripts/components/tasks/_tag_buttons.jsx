'use strict';

var React = require('react');
var _ = require('lodash');

var TagButton = require('components/tasks/_tag_button');

var TagButtons = React.createClass({
  isCurrent: function (tag) {
    return _.any(this.currentNames(), function (name) {
      return tag.name === name
    });
  },
  tagButtons: function () {
    return _.map(this.props.tags, this.tagButton);
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
