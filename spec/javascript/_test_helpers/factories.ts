import appReducer from 'src/app_reducer';

let nextTagId = 0;
let nextTaskId = 0;
let nextTimeframeId = 0;
const timeframeNames: TimeframeName[] = [
  'inbox',
  'today',
  'week',
  'month',
  'quarter',
  'year',
  'lustrum',
  'decade',
];

function makeState(attrs: {[key in keyof State]: any}): State {
  return Object.keys(attrs).reduce((state: State, key: StateKey) => {
    const action = {type: `${key}/SET`, payload: attrs[key]};

    return {...state, ...appReducer(state, action)};
  }, {});
}

function makeTag(attrs: Partial<Tag>): Tag {
  nextTagId += 1;

  return {
    id: nextTagId,
    name: `Tag ${nextTagId}`,
    slug: `tag-${nextTagId}`,
    priority: null,
    rules: [],
    tasks: [],
    ...attrs,
  };
}

function makeTask(attrs: Partial<Task>): Task {
  nextTaskId += 1;

  return {
    id: nextTaskId,
    done: false,
    estimateMinutes: 30,
    loadingState: 'ready',
    pending: false,
    position: nextTaskId,
    priority: null,
    skipCount: 0,
    status: 'active',
    tagIds: [],
    tagNames: [],
    timeframe: null,
    title: `Task ${nextTaskId}`,
    ...attrs,
  };
}

function makeTimeframe(attrs: Partial<Timeframe>): Timeframe {
  nextTimeframeId += 1;

  return {
    name: timeframeNames[nextTimeframeId],
    currentTasks: [],
    pendingTasks: [],
    ...attrs,
  };
}

export {makeState, makeTag, makeTask, makeTimeframe};
