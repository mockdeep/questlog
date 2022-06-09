import debug from 'src/_helpers/debug';

(global as any).debug = debug;

function requestAnimationFrame(callback: Callback) {
  setTimeout(callback, 0);
}

(global as any).requestAnimationFrame = requestAnimationFrame;

window.gon = {
  honeybadgerApiKey: 'hb-api-key',
  railsEnv: 'test',
  userId: 1,
};

// eslint-disable-next-line no-console
console.error = function error(message: string) {
  throw new Error(message);
};
