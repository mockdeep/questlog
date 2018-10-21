type TaskLoadingState = 'marking_done' | 'postponing' | 'ready' | 'updating';

type Task = {
  id: number;
  estimateMinutes: number;
  estimateSeconds?: number;
  parentTaskId?: number;
  pending: boolean;
  priority: number;
  releaseAt?: string;
  repeatSeconds?: number;
  skipCount: number;
  status: 'active' | 'done' | 'pending';
  tagIds: number[];
  tagNames: string[];
  timeframe: TimeframeName;
  title: string;
  loadingState: TaskLoadingState;
};

type TaskMeta = {
  ajaxState?: 'taskSaving' | 'fetching' | 'ready';
  newTask?: Partial<Task>;
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
