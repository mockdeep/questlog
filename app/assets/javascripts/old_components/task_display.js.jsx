(function () {

  'use strict';

  var MainButtons = require('../components/main_buttons');

  Questlog.TaskDisplay = React.createClass({
    render: function () {
      return (
        <div>
          <Questlog.TagButtons task={this.props.task} tags={this.props.tags} />
          <Questlog.TaskTitle
            task={this.props.task}
            loadTask={this.props.loadTask}
          />
          <MainButtons
            task={this.props.task}
            loadTask={this.props.loadTask}
            disabled={this.props.disabled}
            disable={this.props.disable}
          />
          <hr />
          <Questlog.EditTaskForm
            task={this.props.task}
            loadTask={this.props.loadTask}
          />
        </div>
      );
    }
  });

})();
