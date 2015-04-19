(function () {

  'use strict';

  Questlog.TaskFooter = React.createClass({
    render: function () {
      return (
        <p>
          <Questlog.Link to='/tasks'>All my tasks</Questlog.Link>
          {' | '}
          <a href='/bulk_tasks/new'>Add multiple tasks</a>
          {' | '}
          <Questlog.HelpLink />
          <br />
          Try adding a tag using '#', for example: <strong>#home</strong> or
          <strong> #5-min</strong>.  Click <Questlog.HelpLink /> for more.
        </p>
      );
    }
  });

})();
