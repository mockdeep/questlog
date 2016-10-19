'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'QuestlogBase',
  propTypes: {children: React.PropTypes.object.isRequired},
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
});

