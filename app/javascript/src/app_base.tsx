import React from 'react';
import {Provider} from 'react-redux';

import appStore from 'src/app_store';
import RouterContainer from 'src/route/containers/router';

function AppBase() {
  return (
    <Provider store={appStore}>
      <div>
        <RouterContainer />
      </div>
    </Provider>
  );
}

export default AppBase;
