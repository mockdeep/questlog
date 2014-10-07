/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.PostponeButton = React.createClass({
    getInitialState: function () {
      return {postponeSeconds: this.selectOptionsOptions[0].value};
    },
    storeVal: function (event) {
      this.setState({postponeSeconds: event.target.value});
    },

    postponeTask: function () {
      Questlog.request({
        url: 'tasks/' + this.props.id,
        data: {task: {postpone: this.state.postponeSeconds}},
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
      var self = this;
      return _.map(this.selectOptionsOptions, function (optionOptions) {
        return self.selectOption(optionOptions);
      })
    },

    selectOption: function (optionOptions) {
      return (
        <Questlog.SelectOption value={optionOptions.value}
            key={optionOptions.value} content={optionOptions.content} />
      );
    },

    classNames: 'btn btn-info btn-large btn-block',

    render: function () {
      return (
        <div id='postpone' className={this.classNames}onClick={this.postponeTask}>
          <label>Postpone for:</label>
          <select onChange={this.storeVal} onClick={Questlog.stopPropagation}>
            {this.selectOptions()}
          </select>
        </div>
      );
    }
  });

  Questlog.SelectOption = React.createClass({
    render: function () {
      return <option value={this.props.value}>{this.props.content}</option>;
    }
  });

})();
