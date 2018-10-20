type Task = {
  id: number;
  parentTaskId?: number;
  priority: number;
  tagIds: number[];
  title: string;
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
