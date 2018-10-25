declare const debug: any;

interface Window {
  $: any;
  jQuery: any;
  debug: any;
  gon: any;
  Headers: any;
  balanceTime: any;
}

interface Function {
  propTypes: any;
}

interface Process {
  browser: boolean;
}

type BasicAction = {
  type: string;
  payload?: any;
};

type Callback = { (): void };

// https://github.com/reduxjs/redux-thunk/issues/103#issuecomment-298526567
// ThunkAction<R, S, E, A> {
// R => return value of thunk, typically `void` or `Promise`
// S => State
// E => extra argument, typically `null`
// A => Action?
// interface AsyncAction extends ThunkAction<void, State, null, Action> { }

type AjaxData = { tag: AjaxTag } | { task: AjaxTask };
