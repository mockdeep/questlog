/* eslint-disable no-undef, global-require, camelcase */
//= require_self
//= require jquery_ujs
//= require bootstrap
//= require tasks

'use strict';
window.$ = window.jQuery = require('jquery');

window.Honeybadger = window.Honeybadger || require('fake_honeybadger');
Honeybadger.configure({
  api_key: gon.honeybadger_api_key,
  environment: gon.rails_env,
  onerror: true
});

Honeybadger.setContext({user_id: gon.user_id});

require('es5-shim');

require('router');
if (!window.Promise) { window.Promise = require('promise-polyfill'); }
