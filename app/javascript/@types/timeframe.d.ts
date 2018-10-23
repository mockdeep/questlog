type TimeframeName = 'inbox'
  | 'today'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'lustrum'
  | 'decade';

type Timeframe = {
  currentTasks: Task[];
  pendingTasks: Task[];
  name: TimeframeName;
  medianProductivity?: number;
  minuteMax?: number;
};

type TimeframeSpace = {
  [timeframeName: string]: number;
};

type TimeframeData = {
  timeframes: Timeframe[];
  meta: {medianProductivity: number};
};

type TimeframeStoreType = {
  listeners: Callback[];
  models: Timeframe[];
  getAll(): Promise<TimeframeData>;
  subscribe(listener: Callback): Callback;
  loaded: boolean;
  name: 'timeframe';
  url: '/timeframes';
  unsubscribe(listener: Callback): void;
  notifyListeners(): void;
  unload(): void;
  updateModels(data: {tasks: Task[]}): void;
  getState(): TimeframeData;
};
