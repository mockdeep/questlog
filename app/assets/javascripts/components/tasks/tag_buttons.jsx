'use strict';

const React = require('react');
const any = require('lodash').any;

const TagButton = require('components/tasks/tag_button');

const TagButtons = React.createClass({
  propTypes: {
    tags: React.PropTypes.array.isRequired,
    task: React.PropTypes.object.isRequired
  },

  isCurrent(tag) {
    return any(this.currentNames(), function tagNameMatches(name) {
      return tag.name === name;
    });
  },
  tagButtons() {
    return this.props.tags.map(this.tagButton);
  },
  tagButton(tag) {
    return (
      <TagButton tag={tag} key={tag.id} current={this.isCurrent(tag)} />
    );
  },
  currentNames() {
    return this.props.task.tag_names;
  },
  render() {
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
