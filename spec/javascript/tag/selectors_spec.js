import {
  getActiveTags,
  getNextUndoneTask,
  getOrderedTags,
} from 'src/tag/selectors';

import {makeState, makeTask} from '_test_helpers/factories';

describe('getActiveTags', () => {
  it('returns tags that have one or more unfinished associated tasks', () => {
    const tag1 = {id: 1, rules: []};
    const tag2 = {id: 2, name: 'b tag', rules: []};
    const tag3 = {id: 3, name: 'a tag', rules: []};

    const task1 = makeTask({tagIds: [2]});
    const task2 = makeTask({tagIds: [1], releaseAt: 'foo'});
    const task3 = makeTask({tagIds: [2, 3]});

    const state = makeState({tag: [tag1, tag2, tag3], task: [task1, task2, task3]});
    const expected = [
      {...tag3, priority: null, tasks: [task3]},
      {...tag2, priority: null, tasks: [task1, task3]},
    ];

    expect(getActiveTags(state)).toEqual(expected);
  });

  it('returns tags with isActive rule when any tasks are unfinished', () => {
    const tag = {id: 71, rules: [{check: 'isActive'}]};
    const task = makeTask();
    const state = makeState({tag: [tag], task: [task]});

    expect(getActiveTags(state)).toEqual([{...tag, priority: null, tasks: [task]}]);
  });

  describe('when tag has isBlank smart rule', () => {
    it('does not return tag when field is not defined', () => {
      const tag = {id: 71, rules: [{check: 'isBlank', field: 'myField'}]};
      const task = makeTask();
      const state = makeState({tag: [tag], task: [task]});

      expect(getActiveTags(state)).toEqual([]);
    });

    it('does not return tag when field is set to a value', () => {
      const tag = {id: 71, rules: [{check: 'isBlank', field: 'myField'}]};
      const task = makeTask({myField: 'not blank'});
      const state = makeState({tag: [tag], task: [task]});

      expect(getActiveTags(state)).toEqual([]);
    });

    it('returns tag when field is set to null', () => {
      const tag = {id: 71, rules: [{check: 'isBlank', field: 'myField'}]};
      const task = makeTask({myField: null});
      const state = makeState({tag: [tag], task: [task]});
      const expected = [{...tag, priority: null, tasks: [task]}];

      expect(getActiveTags(state)).toEqual(expected);
    });
  });

  describe('when tag has isEmpty smart rule', () => {
    it('does not return tag when field is not empty', () => {
      const tag = {id: 71, rules: [{check: 'isEmpty', field: 'myField'}]};
      const task = makeTask({myField: [1]});
      const state = makeState({tag: [tag], task: [task]});

      expect(getActiveTags(state)).toEqual([]);
    });

    it('returns tag when field is empty on one or more tasks', () => {
      const tag = {id: 71, rules: [{check: 'isEmpty', field: 'myField'}]};
      const task1 = makeTask({myField: []});
      const task2 = makeTask({myField: [1]});
      const state = makeState({tag: [tag], task: [task1, task2]});
      const expected = [{...tag, priority: null, tasks: [task1]}];

      expect(getActiveTags(state)).toEqual(expected);
    });
  });
});

describe('getNextUndoneTask', () => {
  const allTag = {slug: '', rules: [{id: 0, check: 'isActive'}]};

  it('returns the next undone task', () => {
    const task1 = makeTask({title: 'foo', releaseAt: 'blah'});
    const task2 = makeTask({title: 'blah'});
    const state = makeState({
      route: {params: {}},
      task: [task1, task2],
      tag: [allTag],
    });

    expect(getNextUndoneTask(state)).toEqual(task2);
  });

  it('returns next task according to timeframe', () => {
    const task1 = makeTask({title: 'foo', timeframe: 'week'});
    let task2 = makeTask({title: 'blah'});
    let state = makeState({
      route: {params: {}},
      task: [task1, task2],
      tag: [allTag],
    });

    expect(getNextUndoneTask(state)).toEqual(task1);

    task2 = {...task2, timeframe: 'today'};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task2);

    task2 = {...task2, releaseAt: 'blah'};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task1);
  });

  it('returns next task according to priority', () => {
    const task1 = makeTask({title: 'foo', priority: 3});
    let task2 = makeTask({title: 'blah'});
    let state = makeState({
      route: {params: {}},
      task: [task1, task2],
      tag: [allTag],
    });

    expect(getNextUndoneTask(state)).toEqual(task1);

    task2 = {...task2, priority: 2};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task2);

    task2 = {...task2, releaseAt: 'someday'};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task1);
  });

  it('returns next task according to position', () => {
    const task1 = makeTask({title: 'foo', position: 32});
    let task2 = makeTask({title: 'blah', position: 35});
    let state = makeState({
      route: {params: {}},
      task: [task1, task2],
      tag: [allTag],
    });

    expect(getNextUndoneTask(state)).toEqual(task1);

    task2 = {...task2, position: 2};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task2);

    task2 = {...task2, releaseAt: 'someday'};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task1);
  });

  it('returns next task sorted based on various attributes', () => {
    const task1 = makeTask({title: 'foo', position: 32, timeframe: 'today'});
    let task2 = makeTask({title: 'blah', position: 35, timeframe: 'week'});
    let state = makeState({
      route: {params: {}},
      task: [task1, task2],
      tag: [allTag],
    });

    expect(getNextUndoneTask(state)).toEqual(task1);

    task2 = {...task2, position: 2};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task1);

    task2 = {...task2, priority: 1};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task1);

    task2 = {...task2, timeframe: 'today'};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task2);

    task2 = {...task2, priority: null};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task2);

    task2 = {...task2, position: 35};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task1);
  });

  it('returns next task for tag when selected', () => {
    const tag1 = {id: 1, rules: [], slug: 'tag-1-slug'};
    const tag2 = {id: 2, rules: [], slug: 'tag-2-slug'};
    const task1 = makeTask({tagIds: [1, 2], position: 5});
    let task2 = makeTask({tagIds: [], position: 3});

    let state = makeState({
      route: {params: {}},
      task: [task1, task2],
      tag: [allTag, tag1, tag2],
    });

    expect(getNextUndoneTask(state)).toEqual(task2);

    state = {...state, route: {params: {slug: 'tag-1-slug'}}};

    expect(getNextUndoneTask(state)).toEqual(task1);

    task2 = {...task2, tagIds: [1]};
    state = {...state, ...makeState({task: [task1, task2]})};

    expect(getNextUndoneTask(state)).toEqual(task2);

    state = {...state, route: {params: {slug: 'tag-2-slug'}}};

    expect(getNextUndoneTask(state)).toEqual(task1);
  });

  it('returns undefined when there are no tasks', () => {
    const state = makeState({route: {params: {}}, task: [], tag: [allTag]});

    expect(getNextUndoneTask(state)).toBeUndefined();
  });
});

describe('getOrderedTags', () => {
  describe('processed priority', () => {
    it('returns null priority for tags with no priority tasks', () => {
      const tag1 = {id: 1, rules: []};
      const tag2 = {id: 2, rules: []};
      const task1 = makeTask({tagIds: [2]});
      const state = makeState({task: [task1], tag: [tag1, tag2]});

      expect(getOrderedTags(state)[0].priority).toBeNull();
      expect(getOrderedTags(state)[1].priority).toBeNull();
    });

    it('returns the min priority for tasks with priority tasks', () => {
      const tag1 = {id: 1, rules: []};
      const task1 = makeTask({tagIds: [1], priority: 3});
      const task2 = makeTask({tagIds: [1], priority: 1});
      const state = makeState({task: [task1, task2], tag: [tag1]});

      expect(getOrderedTags(state)[0].priority).toBe(1);
    });

    it('returns the numeric priority when some tasks have priority', () => {
      const tag1 = {id: 1, rules: []};
      const task1 = makeTask({tagIds: [1], priority: null});
      const task2 = makeTask({tagIds: [1], priority: 2});
      const state = makeState({task: [task1, task2], tag: [tag1]});

      expect(getOrderedTags(state)[0].priority).toBe(2);
    });
  });
});
