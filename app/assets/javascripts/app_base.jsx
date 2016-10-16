'use strict';

const React = require('react');

module.exports = React.createClass({
  displayName: 'QuestlogBase',
  propTypes: {children: React.PropTypes.object.isRequired},
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
});

