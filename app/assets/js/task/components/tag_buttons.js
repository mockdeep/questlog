'use strict';

import React from 'react';
import {some} from 'lodash';

import TagButton from 'js/task/components/tag_button';

const TagButtons = React.createClass({
  propTypes: {
    tags: React.PropTypes.array.isRequired,
    task: React.PropTypes.object.isRequired
  },

  isCurrent(tag) {
    return some(this.currentNames(), function tagNameMatches(name) {
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

export default TagButtons;
