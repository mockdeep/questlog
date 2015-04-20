(function () {

  'use strict';

  var reloadPage = function () {
    window.location.reload();
  };

  var logError = function (error) {
    console.log('error: ', error.statusText);
  };

  var authenticityToken = function () {
    return $('meta[name="csrf-token"]').attr('content');
  };

  var stopPropagation = function (event) {
    event.stopPropagation();
  };

  Questlog.request = function (options) {
    reqwest(mergeOptions(defaultRequestOptions(), options));
  };

  Questlog.flash = function (status, message) {
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
    return $.extend({}, defaults, options);
  }

  module.exports = {
    authenticityToken: authenticityToken,
    stopPropagation: stopPropagation
  };

})();
