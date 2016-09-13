'use strict';

const React = require('react');
const Link = require('react-router').Link;

const HelpLink = require('_common/components/help_link');

const TaskFooter = React.createClass({
  render() {
    return (
      <p>
        <Link to='/tasks'>{'All my tasks'}</Link>
        {' | '}
        <Link to='/timeframes'>{'Timeframes'}</Link>
        {' | '}
        <a href='/bulk_tasks/new'>{'Add multiple tasks'}</a>
        {' | '}
        <HelpLink />
        <br />
        {'Try adding a tag using "#", for example: '}
        <strong>{'#home'}</strong>{' or '}<strong>{'#5-min'}</strong>{'. '}
        {'Click '}<HelpLink />{' for more.'}
      </p>
    );
  }
});

module.exports = TaskFooter;
