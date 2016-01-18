'use strict';

var React = require('react');
var Link = require('react-router').Link;

var HelpLink = require('components/common/help_link');

var TaskFooter = React.createClass({
  render: function () {
    return (
      <p>
        <Link to='/tasks'>All my tasks</Link>
        {' | '}
        <Link to='/timeframes'>Timeframes</Link>
        {' | '}
        <a href='/bulk_tasks/new'>Add multiple tasks</a>
        {' | '}
        <HelpLink />
        <br />
        Try adding a tag using '#', for example: <strong>#home</strong> or
        <strong> #5-min</strong>.  Click <HelpLink /> for more.
      </p>
    );
  }
});

module.exports = TaskFooter;
