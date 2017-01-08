//= require_self
//= require jquery_ujs

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

ReactDOM.render(router, $('#app-base')[0]);

window.Honeybadger = window.Honeybadger || FakeHoneybadger;
window.Honeybadger.configure({
  api_key: window.gon.honeybadger_api_key, // eslint-disable-line camelcase
  environment: window.gon.rails_env,
  onerror: true
});

// eslint-disable-next-line camelcase
window.Honeybadger.setContext({user_id: window.gon.user_id});

window.Promise = window.Promise || PromisePolyfill;
