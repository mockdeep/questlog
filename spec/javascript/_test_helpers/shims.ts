import 'babel-polyfill';
import debug from 'src/_helpers/debug';
import matchMedia, {resetMedia} from '_test_helpers/match_media';

(global as any).debug = debug;

function requestAnimationFrame(callback: Callback) {
  setTimeout(callback, 0);
}

(global as any).requestAnimationFrame = requestAnimationFrame;

window.gon = {};

(window as any).matchMedia = matchMedia;

afterEach(() => {
  resetMedia();
});

// eslint-disable-next-line no-console
console.error = function error(message: string) {
  throw new Error(message);
};
