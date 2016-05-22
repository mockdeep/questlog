'use strict';

const React = require('react');

const stopPropagation = require('helpers').stopPropagation;

const isPostponing = function (task) {
  return task.loadingState === 'postponing';
};

const SelectOption = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired
  },

  render: function () {
    return <option value={this.props.value}>{this.props.content}</option>;
  }
});

const PostponeButton = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired,
    postponeSeconds: React.PropTypes.number.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    storePostponeSeconds: React.PropTypes.func.isRequired,
    postponeTask: React.PropTypes.func.isRequired,
    loadTask: React.PropTypes.func.isRequired,
    disable: React.PropTypes.func.isRequired
  },

  disableButton: function () {
    this.props.disable();
  },

  updateButton: function () {
    this.props.loadTask();
  },

  postponeTask: function () {
    if (this.props.disabled) { return; }
    this.disableButton();
    this.props.postponeTask(this.props.task.id).then(this.updateButton);
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
    return this.selectOptionsOptions.map(function (optionOptions) {
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

  storePostponeSeconds: function (event) {
    this.props.storePostponeSeconds(event.target.value);
  },

  buttonMessage: function () {
    return isPostponing(this.props.task) ? 'Postponing...' : 'Postpone for:';
  },

  render: function () {
    return (
      <div
        id='postpone'
        disabled={this.props.disabled}
        className={this.className}
        onClick={this.postponeTask}
      >
        <label>{this.buttonMessage()}</label>
        <select
          onChange={this.storePostponeSeconds}
          onClick={stopPropagation}
          disabled={this.props.disabled}
        >
          {this.selectOptions()}
        </select>
      </div>
    );
  }
});

module.exports = PostponeButton;
