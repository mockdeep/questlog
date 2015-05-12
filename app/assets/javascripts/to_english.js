'use strict';

var oneMinute = 60;
var oneHour = oneMinute * 60;

var isNumeric = function (input) {
  return input - 0 === input;
};

var pluralize = function (input, string) {
  var out = input + ' ' + string;
  return input === 1 ? out : out + 's';
};

var divideSeconds = function (seconds) {
  var hours = Math.floor(seconds / oneHour);
  var minutes = Math.floor((seconds % oneHour) / oneMinute);
  var outputs = [];
  if (hours > 0) {
    outputs.push(pluralize(hours, 'hour'));
  }
  if (minutes > 0) {
    outputs.push(pluralize(minutes, 'minute'));
  }
  return outputs.join(', ');
};

var ToEnglish = {
  seconds: function (seconds) {
    if (!isNumeric(seconds)) {
      throw new TypeError('input must be a number');
    } else if (seconds < 0) {
      throw new RangeError('number must not be negative');
    } else if (seconds < 1) {
      return 'None';
    } else if (seconds < oneMinute) {
      return pluralize(Math.floor(seconds), 'second');
    } else {
      return divideSeconds(seconds);
    }
  }
};

module.exports = ToEnglish;
