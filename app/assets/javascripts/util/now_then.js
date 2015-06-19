'use strict';

module.exports = function () {
  // dunno if this is actually working...
  var args = Array.prototype.slice(arguments);
  return {
    then: function (callback) { callback.call(null, args); }
  };
};

