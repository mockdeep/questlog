(function () {

  Questlog.reloadPage = function () {
    window.location.reload();
  };

  Questlog.stopPropagation = function (event) {
    event.stopPropagation();
  },

  Questlog.logError = function (error) {
    console.log(error.statusText);
  },

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
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      success: Questlog.reloadPage,
      error: Questlog.logError
    };
  }

  function mergeOptions(defaults, options) {
    return $.extend({}, defaults, options);
  }

})();
