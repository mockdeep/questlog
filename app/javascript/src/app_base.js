import PropTypes from 'prop-types';
import React from 'react';

function AppBase(props) {
  return <div>{props.children}</div>;
}

AppBase.propTypes = {children: PropTypes.object.isRequired};

export default AppBase;
