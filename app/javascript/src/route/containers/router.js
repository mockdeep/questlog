import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import routes from 'src/_config/routes';

function RouterContainer() {
  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default RouterContainer;
