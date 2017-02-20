import React from 'react';

function AppBase(props) {
  return <div>{props.children}</div>;
}

AppBase.propTypes = {children: React.PropTypes.object.isRequired};

export default AppBase;
