'use strict';

var Link = require('react-router').Link;

var WhatPage = React.createClass({
  render: function () {
    return (
      <div>
        <h1>What's a Questlog?</h1>
        <p>Wouldn't you like to know...</p>
        <Link to='/privacy'>Privacy</Link>
      </div>
    );
  }
});

module.exports = WhatPage;
