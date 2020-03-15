import appReducer from 'src/app_reducer';

let nextTagId = 0;
let nextTaskId = 0;

function makeState(attrs: {[key in keyof State]?: any}): State {
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

function makeBaseTask(): BaseTask {
  nextTaskId += 1;

  return {
    id: nextTaskId,
    done: false,
    estimateMinutes: 30,
    estimateSeconds: null,
    loadingState: 'ready',
    parentTaskId: null,
    position: nextTaskId,
    priority: null,
    repeatSeconds: null,
    skipCount: 0,
    status: 'active',
    tagIds: [],
    tagNames: [],
    timeframe: null,
    title: `Task ${nextTaskId}`,
  };
}

function makePendingTask(attrs: Partial<Task>): PendingTask {
  if (attrs.hasOwnProperty('releaseAt') && !attrs.releaseAt) {
    throw new Error('pending task must have releaseAt');
  }

  return {
    ...makeBaseTask(),
    releaseAt: '2020-03-20T11:24:42.892-07:00',
    ...attrs,
    pending: true,
  };
}

function makeCurrentTask(attrs: Partial<Task>): CurrentTask {
  if (attrs.releaseAt) {
    throw new Error('non-pending task must not have releaseAt');
  }

  return {
    ...makeBaseTask(),
    ...attrs,
    pending: false,
    releaseAt: null,
  };
}

function makeTask(attrs: Partial<Task>): Task {
  if (attrs.pending) {
    return makePendingTask(attrs);
  }
  return makeCurrentTask(attrs);
}

function makeTimeframe(attrs: Partial<Timeframe>): Timeframe {
  return {
    name: 'inbox',
    medianProductivity: 30,
    minuteMax: Infinity,
    currentTasks: [],
    pendingTasks: [],
    ...attrs,
  };
}

export {makeState, makeTag, makeTask, makeTimeframe};
