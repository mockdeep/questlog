type NotificationState = {
  trash: 'goober';
};

type ScratchState = {
  [scratchKey: string]: any;
};

type State = {
  common?: any;
  notification?: NotificationState;
  route?: any;
  scratch?: ScratchState;
  tag?: any;
  task?: any;
  user?: any;
};

type SubState = {};
