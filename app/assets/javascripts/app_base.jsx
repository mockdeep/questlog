'use strict';

const React = require('react');

module.exports = React.createClass({
  propTypes: {children: React.PropTypes.object.isRequired},
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
});

