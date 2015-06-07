'use strict';

var reqwest = require('reqwest');
var _ = require('lodash');

var reloadPage = function () {
  window.location.reload();
};

var logError = function (error) {
  console.log('error: ', error.statusText);
};

var authenticityToken = function () {
  var tokenTag = document.getElementsByName('csrf-token')[0];
  return tokenTag && tokenTag.content;
};

var stopPropagation = function (event) {
  event.stopPropagation();
};

var request = function (options) {
  return reqwest(mergeOptions(defaultRequestOptions(), options));
};

var flash = function (status, message) {
  var $myFlash = $('<div />', { class: 'flash-' + status, text: message });
  $('#flashes').append($myFlash);
  $('[class^=flash-]').fadeOut(1500);
};

function defaultRequestOptions() {
  return {
    type: 'json',
    method: 'put',
    headers: { 'X-CSRF-Token': authenticityToken() },
    success: reloadPage,
    error: logError
  };
}

function mergeOptions(defaults, options) {
  return _.extend({}, defaults, options);
}

module.exports = {
  authenticityToken: authenticityToken,
  flash: flash,
  request: request,
  stopPropagation: stopPropagation
};
