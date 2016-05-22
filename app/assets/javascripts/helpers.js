'use strict';

const reqwest = require('reqwest');
const extend = require('lodash').extend;

function reloadPage() {
  window.location.reload();
}

function logError(error) {
  // eslint-disable-next-line no-console
  console.log('error: ', error.statusText);
}

function authenticityToken() {
  const tokenTag = document.getElementsByName('csrf-token')[0];

  return tokenTag && tokenTag.content;
}

function stopPropagation(event) {
  event.stopPropagation();
}

function defaultRequestOptions() {
  return {
    type: 'json',
    method: 'put',
    headers: {'X-CSRF-Token': authenticityToken()},
    success: reloadPage,
    error: logError
  };
}

function mergeOptions(defaults, options) {
  return extend({}, defaults, options);
}

function request(options) {
  return reqwest(mergeOptions(defaultRequestOptions(), options));
}

function flash(status, message) {
  const $myFlash = $('<div />', {'class': `flash-${status}`, text: message});

  $('#flashes').append($myFlash);
  $('[class^=flash-]').fadeOut(1500);
}

module.exports = {authenticityToken, flash, request, stopPropagation};
