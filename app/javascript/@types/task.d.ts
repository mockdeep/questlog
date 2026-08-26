type TaskLoadingState = "marking_done" | "postponing" | "ready" | "updating";

type NewTask = {
  title: string;
  parentTaskId?: number;
};

type BaseTask = {
  id: number;
  done: boolean;
  estimateSeconds: number | null;
  parentTaskId: number | null;
  position: number;
  priority: number | null;
  repeatSeconds: number | null;
  skipCount: number;
  status: "active" | "done" | "pending";
  tagIds: number[];
  tagNames: string[];
  timeframe: TimeframeName | null;
  title: string;
};

type UnprocessedPendingTask = BaseTask & {
  pending: true;
  releaseAt: string;
}

type UnprocessedCurrentTask = BaseTask & {
  pending: false;
  releaseAt: null;
}

type UnprocessedTask = UnprocessedPendingTask | UnprocessedCurrentTask;

type ProcessedTaskAttributes = {
  estimateMinutes: number;
  loadingState: TaskLoadingState;
};

type PendingTask = UnprocessedPendingTask & ProcessedTaskAttributes;
type CurrentTask = UnprocessedCurrentTask & ProcessedTaskAttributes;

type Task = PendingTask | CurrentTask;

type TaskMeta = {
  ajaxState: "taskSaving" | "fetching" | "ready";
};

type AjaxTask = {
  position: number;
  postpone: number;
  done: boolean;
  priority: number | null;
  timeframe: string;
  title: string;
};

type TasksByParentId = {
  [parentTaskId: number]: Task[];
};

type TasksById = {
  [taskId: string]: Task;
};
