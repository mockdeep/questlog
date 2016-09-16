//= require_self
//= require jquery_ujs
//= require bootstrap
//= require tasks

'use strict';

require('es5-shim');

const ReactDOM = require('react-dom');
const $ = require('jquery');
const PromisePolyfill = require('promise-polyfill');
const FakeHoneybadger = require('_dev/fake_honeybadger');

const router = require('router');

window.$ = window.jQuery = $;

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
