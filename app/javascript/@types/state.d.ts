type NotificationState = {
  currentTask: Notification;
};

type RouteParams = {
  [key: string]: string;
}

type RouteState = {
  name: string;
  params: RouteParams;
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
  notification: NotificationState;
  route: RouteState;
  tag: TagState;
  task: TaskState;
  user: UserState;
};

type StateKey = keyof State;

type SubState = TagState
| TaskState
| NotificationState
| RouteState
| UserState;
