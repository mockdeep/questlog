'use strict';

import React from 'react';

const HelpLink = React.createClass({
  render() {
    return (
      <a href='#' data-toggle='modal' data-target='#tips-modal'>{'Help'}</a>
    );
  },
});

export default HelpLink;
