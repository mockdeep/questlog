import {Controller} from '@hotwired/stimulus';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

import appBase from 'src/app_base';
import appStore from 'src/app_store';
import {fetchRoute} from 'src/route/action_creators';
import {removeNotification} from 'src/notification/action_creators';

class ReactController extends Controller {
  connect() {
    Modal.setAppElement('#app-base');

    window.addEventListener('popstate', () => {
      appStore.dispatch(fetchRoute());
    });

    window.addEventListener('beforeunload', () => {
      appStore.dispatch(removeNotification({key: 'currentTask'}));
    });

    ReactDOM.render(appBase, this.element);
  }
}

export default ReactController;
