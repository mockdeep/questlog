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
interface Task {
  id: number,
  parentTaskId: number,
}

type BasicAction = {
  type: string;
  payload?: any;
};
