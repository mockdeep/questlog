import {
  getActiveTags,
  getNextUndoneTask,
  getOrderedTags,
} from 'src/tag/selectors';

import {makeState, makeTag, makeTask} from '_test_helpers/factories';

describe('getActiveTags', () => {
  it('returns tags that have one or more unfinished associated tasks', () => {
    const tag1 = makeTag();
    const tag2 = makeTag({name: 'b tag'});
    const tag3 = makeTag({name: 'a tag'});
    const task1 = makeTask({tagIds: [tag2.id]});
    const task2 = makeTask({tagIds: [tag1.id], status: 'pending'});
    const task3 = makeTask({tagIds: [tag2.id, tag3.id]});
    const state = makeState({
      tag: [tag1, tag2, tag3],
      task: [task1, task2, task3],
    });
    const expected = [
      {...tag3, tasks: [task3]},
      {...tag2, tasks: [task1, task3]},
    ];

    expect(getActiveTags(state)).toEqual(expected);
  });

  it('returns tags with isActive rule when any tasks are unfinished', () => {
    const tag = makeTag({rules: [{check: 'isActive'}]});
    const task = makeTask();
    const state = makeState({tag: [tag], task: [task]});

    expect(getActiveTags(state)).toEqual([{...tag, tasks: [task]}]);
  });

  describe('when tag has isBlank smart rule', () => {
    it('does not return tag when field is not defined', () => {
      const tag = makeTag({rules: [{check: 'isBlank', field: 'myField'}]});
      const task = makeTask();
      const state = makeState({tag: [tag], task: [task]});

      expect(getActiveTags(state)).toEqual([]);
    });

    it('does not return tag when field is set to a value', () => {
      const tag = makeTag({rules: [{check: 'isBlank', field: 'myField'}]});
      const task = makeTask({myField: 'not blank'});
      const state = makeState({tag: [tag], task: [task]});

      expect(getActiveTags(state)).toEqual([]);
    });

    it('returns tag when field is set to null', () => {
      const tag = makeTag({rules: [{check: 'isBlank', field: 'myField'}]});
      const task = makeTask({myField: null});
      const state = makeState({tag: [tag], task: [task]});
      const expected = [{...tag, tasks: [task]}];

      expect(getActiveTags(state)).toEqual(expected);
    });
  });

  describe('when tag has isEmpty smart rule', () => {
    it('does not return tag when field is not empty', () => {
      const tag = makeTag({rules: [{check: 'isEmpty', field: 'myField'}]});
      const task = makeTask({myField: [1]});
      const state = makeState({tag: [tag], task: [task]});

      expect(getActiveTags(state)).toEqual([]);
    });

    it('returns tag when field is empty on one or more tasks', () => {
      const tag = makeTag({rules: [{check: 'isEmpty', field: 'myField'}]});
      const task1 = makeTask({myField: []});
      const task2 = makeTask({myField: [1]});
      const state = makeState({tag: [tag], task: [task1, task2]});
      const expected = [{...tag, tasks: [task1]}];

      expect(getActiveTags(state)).toEqual(expected);
    });
  });
});

describe('getNextUndoneTask', () => {
  const allTag = makeTag({slug: '', rules: [{check: 'isActive'}]});

  it('returns the next undone task', () => {
    const task1 = makeTask({title: 'foo', status: 'pending'});
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

    task2 = {...task2, status: 'pending'};
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

    task2 = {...task2, status: 'pending'};
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

    task2 = {...task2, status: 'pending'};
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
    const tag1 = makeTag({slug: 'tag-1-slug'});
    const tag2 = makeTag({slug: 'tag-2-slug'});
    const task1 = makeTask({tagIds: [tag1.id, tag2.id], position: 5});
    let task2 = makeTask({position: 3});

    let state = makeState({
      route: {params: {}},
      task: [task1, task2],
      tag: [allTag, tag1, tag2],
    });

    expect(getNextUndoneTask(state)).toEqual(task2);

    state = {...state, route: {params: {slug: 'tag-1-slug'}}};

    expect(getNextUndoneTask(state)).toEqual(task1);

    task2 = {...task2, tagIds: [tag1.id]};
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
      const tag1 = makeTag();
      const tag2 = makeTag();
      const task1 = makeTask({tagIds: [tag2.id]});
      const state = makeState({task: [task1], tag: [tag1, tag2]});

      expect(getOrderedTags(state)[0].priority).toBeNull();
      expect(getOrderedTags(state)[1].priority).toBeNull();
    });

    it('returns the min priority for tasks with priority tasks', () => {
      const tag = makeTag();
      const task1 = makeTask({tagIds: [tag.id], priority: 3});
      const task2 = makeTask({tagIds: [tag.id], priority: 1});
      const state = makeState({task: [task1, task2], tag: [tag]});

      expect(getOrderedTags(state)[0].priority).toBe(1);
    });

    it('returns the numeric priority when some tasks have priority', () => {
      const tag = makeTag();
      const task1 = makeTask({tagIds: [tag.id], priority: null});
      const task2 = makeTask({tagIds: [tag.id], priority: 2});
      const state = makeState({task: [task1, task2], tag: [tag]});

      expect(getOrderedTags(state)[0].priority).toBe(2);
    });
  });
});
