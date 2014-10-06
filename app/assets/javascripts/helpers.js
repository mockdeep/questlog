(function () {

  Questlog.reloadPage = function () {
    window.location.reload();
  };

  Questlog.stopPropagation = function (event) {
    event.stopPropagation();
  },

  Questlog.logError = function (error) {
    console.log(error);
  },

  Questlog.request = function (options) {
    reqwest(mergeOptions(defaultRequestOptions(), options));
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
