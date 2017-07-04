import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import router from 'src/route/components/router';

function RouterContainer() {
  return <BrowserRouter>{router}</BrowserRouter>;
}

export default RouterContainer;
