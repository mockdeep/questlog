'use strict';

const oneMinute = 60;
const oneHour = oneMinute * 60;

const isNumeric = function (input) {
  return input - 0 === input;
};

const pluralize = function (input, string) {
  const out = `${input} ${string}`;

  return input === 1 ? out : `${out}s`;
};

const divideSeconds = function (seconds) {
  const hours = Math.floor(seconds / oneHour);
  const minutes = Math.floor(seconds % oneHour / oneMinute);
  const outputs = [];

  if (hours > 0) {
    outputs.push(pluralize(hours, 'hour'));
  }
  if (minutes > 0) {
    outputs.push(pluralize(minutes, 'minute'));
  }

  return outputs.join(', ');
};

const ToEnglish = {
  seconds(seconds) {
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
