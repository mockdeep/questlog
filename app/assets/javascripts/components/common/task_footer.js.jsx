(function () {

  'use strict';

  Questlog.TaskFooter = React.createClass({
    render: function () {
      return (
        <p>
          <a href='/tasks'>All my tasks</a>
          {' | '}
          <a href='/bulk_tasks/new'>Add multiple tasks</a>
          {' | '}
          <Questlog.HelpLink />
          <br />
          Try adding a tag using '#', for example: <strong>#at-home</strong>.
          Click <Questlog.HelpLink /> for more.
        </p>
      );
    }
  });

})();
