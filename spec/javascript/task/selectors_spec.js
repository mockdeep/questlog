import {getNextUndoneTask} from 'src/task/selectors';

describe('getNextUndoneTask', () => {
  let tagState = {orderedIds: [], byId: {}};

  it('returns the next undone task', () => {
    const task1 = {id: 5, title: 'foo', releaseAt: 'blah', timeframe: null};
    const task2 = {id: 10, title: 'blah', timeframe: null};
    const state = {task: {byId: {5: task1, 10: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);
  });

  it('returns next task according to timeframe', () => {
    const task1 = {id: 5, title: 'foo', timeframe: 'week'};
    let task2 = {id: 10, title: 'blah', timeframe: null};
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
    const task1 = {id: 5, title: 'foo', priority: 3, timeframe: null};
    let task2 = {id: 5, title: 'blah', priority: null, timeframe: null};
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
    const task1 = {id: 5, title: 'foo', position: 32, timeframe: null};
    let task2 = {id: 5, title: 'blah', position: 35, timeframe: null};
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
      id: 5,
      title: 'foo',
      position: 32,
      priority: null,
      timeframe: 'today',
    };
    let task2 = {
      id: 5,
      title: 'blah',
      position: 35,
      priority: null,
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
    let tag1 = {id: 1};
    let tag2 = {id: 2};
    const task1 = {id: 3, tagIds: [1, 2], position: 5, timeframe: null};
    let task2 = {id: 4, tagIds: [], position: 3, timeframe: null};

    tagState = {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2]};
    let state = {task: {byId: {3: task1, 4: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);

    tag1 = {...tag1, isSelected: true};
    tagState = {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2]};
    state = {task: {byId: {3: task1, 4: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, tagIds: [1]};
    state = {task: {byId: {3: task1, 4: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task2);

    tag2 = {...tag2, isSelected: true};
    tagState = {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2]};
    state = {task: {byId: {3: task1, 4: task2}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns undefined when there are no tasks', () => {
    const state = {task: {byId: {}}, tag: {byId: {}, orderedIds: []}};

    expect(getNextUndoneTask(state)).toBeUndefined();
  });
});
