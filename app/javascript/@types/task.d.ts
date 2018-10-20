type Task = {
  id: number;
  parentTaskId: number;
  title: string;
};

type AjaxTask = {
  postpone?: boolean;
  done?: boolean;
  priority?: number;
  timeframe?: string;
  title: string;
};
