'use strict';

const React = require('react');

const HelpLink = React.createClass({
  render() {
    return (
      <a href='#' data-toggle='modal' data-target='#tips-modal'>{'Help'}</a>
    );
  }
});

module.exports = HelpLink;
