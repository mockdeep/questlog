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

var divideInput = function (input) {
  hours = Math.round(input / oneHour);
  minutes = Math.round((input - hours * oneHour) / oneMinute);
  outputs = [];
  if (hours > 0) {
    outputs.push(pluralize(hours, 'hour'));
  }
  if (minutes > 0) {
    outputs.push(pluralize(minutes, 'minute'));
  }
  return outputs.join(', ');
};

var ToEnglish = {
  seconds: function (input) {
    if (!isNumeric(input)) {
      throw new TypeError('input must be a number');
    } else if (input < 0) {
      throw new RangeError('number must not be negative');
    } else if (input < 1) {
      return 'None';
    } else if (input < oneMinute) {
      return pluralize(Math.floor(input), 'second');
    } else {
      return divideInput(input);
    }
  }
};

module.exports = ToEnglish;
