import 'src/globals';
import $ from 'jquery';
import Honeybadger from 'honeybadger-js';

$(() => $('[class^=flash-]').fadeOut(1500));

// depends on global jQuery, so can't be imported, as that gets hoisted
require('bootstrap-sass');
require('jquery-ujs');

Honeybadger.configure({
  apiKey: window.gon.honeybadgerApiKey, // eslint-disable-line camelcase
  environment: window.gon.railsEnv,
  onerror: true,
});

Honeybadger.setContext({userId: window.gon.userId});
