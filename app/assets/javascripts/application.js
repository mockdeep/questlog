//= require_self
//= require jquery_ujs
//= require bootstrap
//= require tasks

'use strict';

require('es5-shim');
const $ = require('jquery');
const PromisePolyfill = require('promise-polyfill');
const FakeHoneybadger = require('fake_honeybadger');

window.$ = window.jQuery = $;

require('router');

window.Honeybadger = window.Honeybadger || FakeHoneybadger;
window.Honeybadger.configure({
  api_key: window.gon.honeybadger_api_key, // eslint-disable-line camelcase
  environment: window.gon.rails_env,
  onerror: true
});

// eslint-disable-next-line camelcase
window.Honeybadger.setContext({user_id: window.gon.user_id});

window.Promise = window.Promise || PromisePolyfill;
