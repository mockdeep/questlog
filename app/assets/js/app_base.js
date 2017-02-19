'use strict';

import React from 'react';

const AppBase = React.createClass({
  propTypes: {children: React.PropTypes.object.isRequired},
  render() {
    return (
      <div>{this.props.children}</div>
    );
  },
});

export default AppBase;
