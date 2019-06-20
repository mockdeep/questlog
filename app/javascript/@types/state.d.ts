type CommonState = {
  openModalId: string;
};

type NotificationState = {
  currentTask: Notification;
};

type RouteState = {
  name: string;
  params: {[key: string]: string};
};

type ScratchState = {
  [scratchKey: string]: any;
};

type TagState = {
  byId: {[id: number]: Tag};
  meta: TagMeta;
};

type TaskState = {
  byId: {[id: string]: Task};
  meta: TaskMeta;
};

type UserState = {
  notificationsEnabled: boolean;
};

type State = {
  common: CommonState;
  notification: NotificationState;
  route: RouteState;
  scratch: ScratchState;
  tag: TagState;
  task: TaskState;
  user: UserState;
};

type StateKey = keyof State;

type SubState = ScratchState
| TagState
| TaskState
| CommonState
| NotificationState
| RouteState
| UserState;
