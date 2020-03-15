type TaskLoadingState = 'marking_done' | 'postponing' | 'ready' | 'updating';

type NewTask = {
  title: string;
};

type BaseTask = {
  id: number;
  done: boolean;
  estimateMinutes: number;
  estimateSeconds: number | null;
  parentTaskId: number | null;
  position: number;
  priority: number | null;
  repeatSeconds: number | null;
  skipCount: number;
  status: 'active' | 'done' | 'pending';
  tagIds: number[];
  tagNames: string[];
  timeframe: TimeframeName | null;
  title: string;
  loadingState: TaskLoadingState;
};

type PendingTask = BaseTask & {
  pending: true;
  releaseAt: string;
}

type CurrentTask = BaseTask & {
  pending: false;
  releaseAt: null;
}

type Task = PendingTask | CurrentTask;

type BulkTask = {
  positions?: number[];
  titles?: string;
};

type TaskStoreType = {
  listeners: Callback[];
  loaded: boolean;
  models: Task[];
  name: 'task';
  url: '/tasks';
  subscribe(listener: Callback): Callback;
  notifyListeners(): void;
  unload(): void;
  unsubscribe(listener: Callback): void;
  updateModels({data}: {data: Task[]}): void;
  getState(): {loaded: boolean; tasks: Task[]};
  dispatch(action: BasicAction): void;
  fetchTasks(): void;
};

type BulkTaskStoreType = {
  listeners: Callback[];
  loaded: boolean;
  models: Task[];
  name: 'bulk_task';
  url: '/bulk_task';
  subscribe(listener: Callback): Callback;
  unsubscribe(listener: Callback): void;
  notifyListeners(): void;
  unload(): void;
  create(attrs: BulkTask): Promise<string>;
  update(attrs: BulkTask): Promise<string>;
};

type TaskMeta = {
  ajaxState: 'taskSaving' | 'fetching' | 'ready';
  newTask: Partial<Task>;
};

type AjaxTask = {
  postpone?: boolean;
  done?: boolean;
  priority?: number;
  timeframe?: string;
  title: string;
};

type TasksByParentId = {
  [parentTaskId: number]: Task[];
};

type TasksById = {
  [taskId: string]: Task;
};
