type TimeframeName = "inbox"
| "today"
| "week"
| "month"
| "quarter"
| "year"
| "lustrum"
| "decade";

type Timeframe = {
  currentTasks: Task[];
  pendingTasks: Task[];
  name: TimeframeName;
  minuteMax: number;
  minuteTotal: number;
};

// A timeframe as the server sends it: a null minuteMax means no limit
type TimeframeData = Omit<Timeframe, "minuteMax"> & {
  minuteMax: number | null;
};

type TimeframePayload = {
  data: TimeframeData[];
  meta: {medianProductivity: number};
};

type TimeframeSpace = {
  [timeframeName: string]: number;
};

type TimeframeState = {
  timeframes: Timeframe[];
  meta: {medianProductivity: number};
};

type TimeframeStoreType = {
  listeners: Callback[];
  models: Timeframe[];
  getAll(): Promise<TimeframeState>;
  subscribe(listener: Callback): Callback;
  loaded: boolean;
  name: "timeframe";
  url: "/timeframes";
  unsubscribe(listener: Callback): void;
  notifyListeners(): void;
  unload(): void;
  getState(): TimeframeState;
};
