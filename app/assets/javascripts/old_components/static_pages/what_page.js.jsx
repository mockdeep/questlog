(function () {

  'use strict';

  Questlog.WhatPage = React.createClass({

    render: function () {
      return (
        <div>
          <h1>What's a Questlog?</h1>
          <p>Wouldn't you like to know...</p>
          <Questlog.Link to='/privacy'>Privacy</Questlog.Link>
        </div>
      );
    }

  });

})();
