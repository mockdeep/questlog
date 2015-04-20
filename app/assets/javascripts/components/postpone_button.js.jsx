(function () {

  'use strict';

  var helpers = require('../helpers');

  var SelectOption = React.createClass({
    render: function () {
      return <option value={this.props.value}>{this.props.content}</option>;
    }
  });

  var PostponeButton = React.createClass({
    getInitialState: function () {
      return {
        postponeSeconds: this.selectOptionsOptions[0].value,
        labelContent: 'Postpone for:',
      };
    },

    storeVal: function (event) {
      this.setState({postponeSeconds: event.target.value});
    },

    disableButton: function () {
      this.setState({labelContent: 'Postponing...'});
      this.props.disable();
    },

    updateButton: function () {
      this.setState({labelContent: 'Postponed for:'});
      this.props.loadTask();
    },

    postponeTask: function () {
      if (this.props.disabled) { return; }
      this.disableButton();
      helpers.request({
        url: 'tasks/' + this.props.task.id,
        data: {task: {postpone: this.state.postponeSeconds}},
        success: this.updateButton,
      });
    },

    selectOptionsOptions: [
      {value: '300', content: '5 minutes'},
      {value: '1800', content: '30 minutes'},
      {value: '3600', content: '1 hour'},
      {value: '10800', content: '3 hours'},
      {value: '21600', content: '6 hours'},
      {value: '32400', content: '9 hours'},
      {value: '43200', content: '12 hours'},
      {value: '86400', content: '1 day'},
      {value: '172800', content: '2 days'},
      {value: '259200', content: '3 days'},
      {value: '604800', content: '1 week'},
      {value: '1209600', content: '2 weeks'},
      {value: '2592000', content: '1 month'}
    ],

    selectOptions: function () {
      return _.map(this.selectOptionsOptions, function (optionOptions) {
        return this.selectOption(optionOptions);
      }.bind(this));
    },

    selectOption: function (optionOptions) {
      return (
        <SelectOption
          value={optionOptions.value}
          key={optionOptions.value}
          content={optionOptions.content}
        />
      );
    },

    className: 'btn btn-info btn-lg btn-block postpone-button',

    componentWillReceiveProps: function (newProps) {
      if (!newProps.disabled) {
        this.setState({labelContent: 'Postpone for:'});
      }
    },

    render: function () {
      return (
        <div
          id='postpone'
          disabled={this.props.disabled}
          className={this.className}
          onClick={this.postponeTask}
        >
          <label>{this.state.labelContent}</label>
          <select
            onChange={this.storeVal}
            onClick={helpers.stopPropagation}
            disabled={this.props.disabled}
          >
            {this.selectOptions()}
          </select>
        </div>
      );
    }
  });

  module.exports = PostponeButton;

})();
