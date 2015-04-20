(function () {
  'use strict';

  var HelpLink = require('../../components/common/help_link');

  Questlog.TaskFooter = React.createClass({
    render: function () {
      return (
        <p>
          <Questlog.Link to='/tasks'>All my tasks</Questlog.Link>
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

})();
