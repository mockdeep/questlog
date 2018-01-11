import debug from 'src/_helpers/debug';

global.debug = debug;

global.requestAnimationFrame = function requestAnimationFrame(callback) {
  setTimeout(callback, 0);
};

console.error = function error(message) { // eslint-disable-line no-console
  throw new Error(message);
};
