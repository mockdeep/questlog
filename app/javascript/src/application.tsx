import 'babel-polyfill';
import 'src/globals';
import $ from 'jquery';
import Honeybadger from 'honeybadger-js';
import ReactDOM from 'react-dom';

import appBase from 'src/app_base';
import appStore from 'src/app_store';
import {fetchRoute} from 'src/route/action_creators';
import {removeNotification} from 'src/notification/action_creators';

$(() => $('[class^=flash-]').fadeOut(1500));

window.addEventListener('popstate', () => {
  appStore.dispatch(fetchRoute());
});

window.addEventListener('beforeunload', () => {
  appStore.dispatch(removeNotification({key: 'currentTask'}));
});

// depends on global jQuery, so can't be imported, as that gets hoisted
require('bootstrap-sass');
require('jquery-ujs');

ReactDOM.render(appBase, $('#app-base')[0]);

Honeybadger.configure({
  apiKey: window.gon.honeybadgerApiKey, // eslint-disable-line camelcase
  environment: window.gon.railsEnv,
  onerror: true,
});

Honeybadger.setContext({userId: window.gon.userId});
