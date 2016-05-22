'use strict';

const reqwest = require('reqwest');
const extend = require('lodash').extend;

const reloadPage = function () {
  window.location.reload();
};

const logError = function (error) {
  // eslint-disable-next-line no-console
  console.log('error: ', error.statusText);
};

const authenticityToken = function () {
  const tokenTag = document.getElementsByName('csrf-token')[0];

  return tokenTag && tokenTag.content;
};

const stopPropagation = function (event) {
  event.stopPropagation();
};

const defaultRequestOptions = function () {
  return {
    type: 'json',
    method: 'put',
    headers: {'X-CSRF-Token': authenticityToken()},
    success: reloadPage,
    error: logError
  };
};

const mergeOptions = function (defaults, options) {
  return extend({}, defaults, options);
};

const request = function (options) {
  return reqwest(mergeOptions(defaultRequestOptions(), options));
};

const flash = function (status, message) {
  const $myFlash = $('<div />', {'class': `flash-${status}`, text: message});

  $('#flashes').append($myFlash);
  $('[class^=flash-]').fadeOut(1500);
};

module.exports = {
  authenticityToken: authenticityToken,
  flash: flash,
  request: request,
  stopPropagation: stopPropagation
};
