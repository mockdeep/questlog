'use strict';

const React = require('react');

const PrivacyPage = React.createClass({
  render() {
    return (
      <div>
        <p>{'I won\'t sell your data.'}</p>
        <p>{'I will use your data to make Questlog better.'}</p>
      </div>
    );
  }
});

module.exports = PrivacyPage;
