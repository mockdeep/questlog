'use strict';

require('es5-shim');

import $ from 'jquery';
import Honeybadger from 'honeybadger-js';
import PromisePolyfill from 'promise-polyfill';
import ReactDOM from 'react-dom';

import router from 'router';
import 'js/tasks';

window.$ = window.jQuery = $;

// depends on global jQuery, so can't be imported, as that gets hoisted
require('bootstrap-sass');
require('jquery-ujs');

ReactDOM.render(router, $('#app-base')[0]);

Honeybadger.configure({
  api_key: window.gon.honeybadgerApiKey,
  environment: window.gon.railsEnv,
  onerror: true
});

Honeybadger.setContext({userId: window.gon.userId});

window.Promise = window.Promise || PromisePolyfill;
