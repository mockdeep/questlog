type NotificationState = {
  trash: 'goober';
};

type ScratchState = {
  [scratchKey: string]: any;
};

type TagState = {
  byId: {[id: number]: Tag};
};

type State = {
  common?: any;
  notification?: NotificationState;
  route?: any;
  scratch?: ScratchState;
  tag?: TagState;
  task?: any;
  user?: any;
};

type SubState = ScratchState
  | TagState
  | NotificationState;
