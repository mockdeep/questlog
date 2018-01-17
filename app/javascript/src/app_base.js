import React from 'react';
import {Provider} from 'react-redux';

import appStore from 'src/app_store';
import RouterContainer from 'src/route/containers/router';
import Sidebar from 'src/_common/components/sidebar';
import {fetchTasks} from 'src/task/action_creators';
import {fetchRoute} from 'src/route/action_creators';

appStore.dispatch(fetchTasks());
appStore.dispatch(fetchRoute());

const AppBase = (
  <Provider store={appStore}>
    <div>
      <Sidebar />
      <RouterContainer />
    </div>
  </Provider>
);

export default AppBase;
