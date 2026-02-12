import {debug} from "helpers";

(global as any).debug = debug;

function requestAnimationFrame(callback: Callback): void {
  setTimeout(callback, 0);
}

(global as any).requestAnimationFrame = requestAnimationFrame;

window.gon = {
  honeybadgerApiKey: "hb-api-key",
  railsEnv: "test",
  userId: 1,
};

// eslint-disable-next-line no-console
console.error = function error(message: string): void {
  throw new Error(message);
};
