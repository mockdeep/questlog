import 'babel-polyfill';
import $ from 'jquery';
import Honeybadger from 'honeybadger-js';
import ReactDOM from 'react-dom';

import router from 'src/router';
import 'src/tasks';

window.$ = $;
window.jQuery = $;

// depends on global jQuery, so can't be imported, as that gets hoisted
require('bootstrap-sass');
require('jquery-ujs');

ReactDOM.render(router, $('#app-base')[0]);

Honeybadger.configure({
  api_key: window.gon.honeybadgerApiKey, // eslint-disable-line camelcase
  environment: window.gon.railsEnv,
  onerror: true,
});

Honeybadger.setContext({userId: window.gon.userId});
