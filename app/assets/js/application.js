'use strict';

require('es5-shim');

import ReactDOM from 'react-dom';
import $ from 'jquery';
import PromisePolyfill from 'promise-polyfill';
import FakeHoneybadger from 'js/_dev/fake_honeybadger';

import router from 'router';
import 'js/tasks';

window.$ = window.jQuery = $;

// depends on global jQuery, so can't be imported, as that gets hoisted
require('bootstrap-sass');
require('jquery-ujs');

ReactDOM.render(router, $('#app-base')[0]);

window.Honeybadger = window.Honeybadger || FakeHoneybadger;
window.Honeybadger.configure({
  api_key: window.gon.honeybadgerApiKey,
  environment: window.gon.railsEnv,
  onerror: true
});

window.Honeybadger.setContext({userId: window.gon.userId});

window.Promise = window.Promise || PromisePolyfill;
