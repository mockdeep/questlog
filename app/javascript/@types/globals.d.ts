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
interface State {
  route: any,
  tag: any,
  task: any,
}

interface Task {
  id: number,
  parentTaskId: number,
}
