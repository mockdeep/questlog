type Gon = {
  honeybadgerApiKey: string;
  railsEnv: 'development' | 'production' | 'test';
  userId: number;
};

interface Window {
  $: JQueryStatic;
  jQuery: JQueryStatic;
  debug: () => void;
  gon: Gon;
}

type Process = {
  browser: boolean;
};

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

type AjaxData = { tag: Partial<AjaxTag> } | { task: Partial<AjaxTask> };
