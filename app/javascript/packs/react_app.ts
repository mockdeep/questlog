import ReactDOM from 'react-dom';

import appBase from 'src/app_base';
import appStore from 'src/app_store';
import {fetchRoute} from 'src/route/action_creators';
import {removeNotification} from 'src/notification/action_creators';

window.addEventListener('popstate', () => {
  appStore.dispatch(fetchRoute());
});

window.addEventListener('beforeunload', () => {
  appStore.dispatch(removeNotification({key: 'currentTask'}));
});

ReactDOM.render(appBase, document.querySelector('#app-base'));
