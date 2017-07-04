import update from 'immutability-helper';

import {getActiveTags, getNextUndoneTask} from 'src/tag/selectors';

describe('getActiveTags', () => {
  it('returns tags that have one or more unfinished tasks', () => {
    let tag1 = {id: 1, unfinishedTasksCount: 0};
    let tag2 = {id: 2, unfinishedTasksCount: 1};
    let tagState = {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2], meta: {}};
    let state = {tag: tagState};

    expect(getActiveTags(state)).toEqual([tag2]);

    tag1 = {...tag1, unfinishedTasksCount: 5};
    tagState = update(tagState, {byId: {$merge: {1: tag1}}});
    state = {tag: tagState};

    expect(getActiveTags(state)).toEqual([tag1, tag2]);

    tag2 = {...tag2, unfinishedTasksCount: 0};
    tagState = update(tagState, {byId: {$merge: {2: tag2}}});
    state = {tag: tagState};

    expect(getActiveTags(state)).toEqual([tag1]);
  });
});

describe('getNextUndoneTask', () => {
  const allTag = {rules: [{id: 0, check: 'isActive'}]};
  const baseTask = {priority: null, tagIds: [], timeframe: null};
  let tagState = {orderedIds: [0], byId: {0: allTag}, meta: {}};

  it('returns the next undone task', () => {
    const task1 = {...baseTask, id: 5, title: 'foo', releaseAt: 'blah'};
    const task2 = {...baseTask, id: 10, title: 'blah'};
    const state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);
  });

  it('returns next task according to timeframe', () => {
    const task1 = {...baseTask, id: 5, title: 'foo', timeframe: 'week'};
    let task2 = {...baseTask, id: 10, title: 'blah'};
    let state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, timeframe: 'today'};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, releaseAt: 'blah'};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns next task according to priority', () => {
    const task1 = {...baseTask, id: 5, title: 'foo', priority: 3};
    let task2 = {...baseTask, id: 10, title: 'blah'};
    let state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, priority: 2};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, releaseAt: 'someday'};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns next task according to position', () => {
    const task1 = {...baseTask, id: 5, title: 'foo', position: 32};
    let task2 = {...baseTask, id: 10, title: 'blah', position: 35};
    let state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, position: 2};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, releaseAt: 'someday'};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns next task sorted based on various attributes', () => {
    const task1 = {
      ...baseTask,
      id: 5,
      title: 'foo',
      position: 32,
      timeframe: 'today',
    };
    let task2 = {
      ...baseTask,
      id: 10,
      title: 'blah',
      position: 35,
      timeframe: 'week',
    };
    let state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, position: 2};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, priority: 1};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, timeframe: 'today'};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, priority: null};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, position: 35};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns next task for tag when selected', () => {
    const tag1 = {id: 1, rules: []};
    const tag2 = {id: 2, rules: []};
    const task1 = {...baseTask, id: 5, tagIds: [1, 2], position: 5};
    let task2 = {...baseTask, id: 10, tagIds: [], position: 3};

    tagState = {
      byId: {0: allTag, 1: tag1, 2: tag2},
      orderedIds: [0, 1, 2],
      meta: {},
    };
    let state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);

    tagState = {...tagState, meta: {selectedTagId: tag1.id}};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, tagIds: [1]};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);

    tagState = {...tagState, meta: {selectedTagId: tag2.id}};
    state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns undefined when there are no tasks', () => {
    const state = {task: {byId: {}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBeUndefined();
  });
});
