/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.PostponeButton = React.createClass({
    storeVal: function (event) {
      // doesn't do anything yet. Need to move jquery events in here.
      this.setState({value: event.target.value});
    },

    render: function () {
      return (
        <div id='postpone' className='btn btn-info btn-large btn-block'>
          <label htmlFor='task-postpone'>Postpone for:</label>
          <select id='task-postpone' name='task[postpone]' onChange={this.storeVal}>
            <option value='300'>5 minutes</option>
            <option value='1800'>30 minutes</option>
            <option value='3600'>1 hour</option>
            <option value='10800'>3 hours</option>
            <option value='21600'>6 hours</option>
            <option value='32400'>9 hours</option>
            <option value='43200'>12 hours</option>
            <option value='86400'>1 day</option>
            <option value='172800'>2 days</option>
            <option value='259200'>3 days</option>
            <option value='604800'>1 week</option>
            <option value='1209600'>2 weeks</option>
            <option value='2592000'>1 month</option>
          </select>
        </div>
      );
    }

  });

})();
