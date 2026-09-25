import {debug} from "helpers/debug";

(global as any).debug = debug;

function requestAnimationFrame(callback: Callback): void {
  setTimeout(callback, 0);
}

(global as any).requestAnimationFrame = requestAnimationFrame;

// eslint-disable-next-line no-console
console.error = function error(message: string): void {
  throw new Error(message);
};
