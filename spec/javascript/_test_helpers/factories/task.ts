import {nextId} from '_test_helpers/factories/id';

function makeBaseTask(): BaseTask {
  const nextTaskId = nextId();

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

  const releaseAt = '2020-03-20T11:24:42.892-07:00';

  return {
    ...makeBaseTask(),
    ...attrs,
    pending: true,
    releaseAt,
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

export {makeTask};
