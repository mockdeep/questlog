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

type TagState = {
  byId: TagsById;
};

type TaskState = {
  byId: {[id: number]: Task};
  meta: TaskMeta;
};

type UserState = {
  notificationsEnabled: boolean;
};

type State = {
  common: CommonState;
  notification: NotificationState;
  route: RouteState;
  tag: TagState;
  task: TaskState;
  user: UserState;
};

type StateKey = keyof State;

type SubState = TagState
| TaskState
| CommonState
| NotificationState
| RouteState
| UserState;
