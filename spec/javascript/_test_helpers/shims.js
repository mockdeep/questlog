import debug from 'src/_helpers/debug';
import matchMedia from '_test_helpers/match_media';

global.debug = debug;

global.requestAnimationFrame = function requestAnimationFrame(callback) {
  setTimeout(callback, 0);
};

window.gon = {};

window.matchMedia = matchMedia;

afterEach(() => {
  window.matchMedia.reset();
});

console.error = function error(message) { // eslint-disable-line no-console
  throw new Error(message);
};
