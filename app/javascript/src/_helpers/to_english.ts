const oneMinute = 60;
const oneHour = oneMinute * 60;

function isNumeric(input: any) {
  return input - 0 === input;
}

function pluralize(input: number, string: string) {
  const out = `${input} ${string}`;

  return input === 1 ? out : `${out}s`;
}

function divideSeconds(seconds: number) {
  const hours = Math.floor(seconds / oneHour);
  const minutes = Math.floor(seconds % oneHour / oneMinute);
  const outputs = [
    hours && pluralize(hours, 'hour'),
    minutes && pluralize(minutes, 'minute'),
  ];

  return outputs.filter(value => value).join(', ');
}

const ToEnglish = {
  seconds(seconds: any) {
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
  },
};

export default ToEnglish;
