import {
  getActiveTags,
  getNextUndoneTask,
  getTagMetaInfo,
} from 'src/tag/selectors';

describe('getActiveTags', () => {
  it('returns tags that have one or more unfinished associated tasks', () => {
    const tag1 = {id: 1, rules: []};
    const tag2 = {id: 2, name: 'b tag', rules: []};
    const tag3 = {id: 3, name: 'a tag', rules: []};

    const task1 = {timeframe: null, tagIds: [2], subTasks: []};
    const task2 = {timeframe: null, tagIds: [1], releaseAt: 'foo', subTasks: []};
    const task3 = {timeframe: null, tagIds: [2, 3], subTasks: []};

    const state = {
      tag: {byId: {1: tag1, 2: tag2, 3: tag3}, orderedIds: [3, 2, 1]},
      task: {byId: {5: task1, 6: task2, 7: task3}},
    };

    expect(getActiveTags(state)).toEqual([tag3, tag2]);
  });

  it('returns tags with isActive rule when any tasks are unfinished', () => {
    const tag = {id: 71, rules: [{check: 'isActive'}]};
    const task = {timeframe: null, tagIds: [], subTasks: []};
    const state = {
      tag: {orderedIds: [71], byId: {71: tag}},
      task: {byId: {1: task}},
    };

    expect(getActiveTags(state)).toEqual([tag]);
  });

  describe('when tag has isBlank smart rule', () => {
    it('does not return tag when field is not defined', () => {
      const tag = {id: 71, rules: [{check: 'isBlank', field: 'myField'}]};
      const task = {timeframe: null, tagIds: [], subTasks: []};
      const state = {
        tag: {orderedIds: [71], byId: {71: tag}},
        task: {byId: {1: task}},
      };

      expect(getActiveTags(state)).toEqual([]);
    });

    it('does not return tag when field is set to a value', () => {
      const tag = {id: 71, rules: [{check: 'isBlank', field: 'myField'}]};
      const task = {
        timeframe: null,
        tagIds: [],
        myField: 'not blank',
        subTasks: [],
      };
      const state = {
        tag: {orderedIds: [71], byId: {71: tag}},
        task: {byId: {1: task}},
      };

      expect(getActiveTags(state)).toEqual([]);
    });

    it('returns tag when field is set to null', () => {
      const tag = {id: 71, rules: [{check: 'isBlank', field: 'myField'}]};
      const task = {timeframe: null, tagIds: [], myField: null, subTasks: []};
      const state = {
        tag: {orderedIds: [71], byId: {71: tag}},
        task: {byId: {1: task}},
      };

      expect(getActiveTags(state)).toEqual([tag]);
    });
  });

  describe('when tag has isEmpty smart rule', () => {
    it('does not return tag when field is not empty', () => {
      const tag = {id: 71, rules: [{check: 'isEmpty', field: 'myField'}]};
      const task = {timeframe: null, tagIds: [], myField: [1], subTasks: []};
      const state = {
        tag: {orderedIds: [71], byId: {71: tag}},
        task: {byId: {1: task}},
      };

      expect(getActiveTags(state)).toEqual([]);
    });

    it('returns tag when field is empty on one or more tasks', () => {
      const tag = {id: 71, rules: [{check: 'isEmpty', field: 'myField'}]};
      const task1 = {timeframe: null, tagIds: [], myField: [], subTasks: []};
      const task2 = {timeframe: null, tagIds: [], myField: [1], subTasks: []};
      const state = {
        tag: {orderedIds: [71], byId: {71: tag}},
        task: {byId: {1: task1, 2: task2}},
      };

      expect(getActiveTags(state)).toEqual([tag]);
    });
  });
});

describe('getNextUndoneTask', () => {
  const allTag = {slug: '', rules: [{id: 0, check: 'isActive'}]};
  const baseTask = {priority: null, tagIds: [], timeframe: null, subTasks: []};
  let tagState = {orderedIds: [0], byId: {0: allTag}, meta: {}};

  it('returns the next undone task', () => {
    const task1 = {...baseTask, id: 5, title: 'foo', releaseAt: 'blah'};
    const task2 = {...baseTask, id: 10, title: 'blah'};
    const state = {
      route: {params: {}},
      task: {byId: {5: task1, 10: task2}},
      tag: tagState,
    };

    expect(getNextUndoneTask(state)).toBe(task2);
  });

  it('returns next task according to timeframe', () => {
    const task1 = {...baseTask, id: 5, title: 'foo', timeframe: 'week'};
    let task2 = {...baseTask, id: 10, title: 'blah'};
    let state = {
      route: {params: {}},
      task: {byId: {5: task1, 10: task2}},
      tag: tagState,
    };

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, timeframe: 'today'};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, releaseAt: 'blah'};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns next task according to priority', () => {
    const task1 = {...baseTask, id: 5, title: 'foo', priority: 3};
    let task2 = {...baseTask, id: 10, title: 'blah'};
    let state = {
      route: {params: {}},
      task: {byId: {5: task1, 10: task2}},
      tag: tagState,
    };

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, priority: 2};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, releaseAt: 'someday'};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns next task according to position', () => {
    const task1 = {...baseTask, id: 5, title: 'foo', position: 32};
    let task2 = {...baseTask, id: 10, title: 'blah', position: 35};
    let state = {
      route: {params: {}},
      task: {byId: {5: task1, 10: task2}},
      tag: tagState,
    };

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, position: 2};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, releaseAt: 'someday'};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

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
    let state = {
      route: {params: {}},
      task: {byId: {5: task1, 10: task2}},
      tag: tagState,
    };

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, position: 2};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, priority: 1};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, timeframe: 'today'};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, priority: null};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task2);

    task2 = {...task2, position: 35};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns next task for tag when selected', () => {
    const tag1 = {id: 1, rules: [], slug: 'tag-1-slug'};
    const tag2 = {id: 2, rules: [], slug: 'tag-2-slug'};
    const task1 = {...baseTask, id: 5, tagIds: [1, 2], position: 5};
    let task2 = {...baseTask, id: 10, tagIds: [], position: 3};

    tagState = {
      byId: {0: allTag, 1: tag1, 2: tag2},
      orderedIds: [0, 1, 2],
      meta: {},
    };
    let state = {
      route: {params: {}},
      task: {byId: {5: task1, 10: task2}},
      tag: tagState,
    };

    expect(getNextUndoneTask(state)).toBe(task2);

    state = {...state, route: {params: {slug: 'tag-1-slug'}}};

    expect(getNextUndoneTask(state)).toBe(task1);

    task2 = {...task2, tagIds: [1]};
    state = {...state, task: {byId: {5: task1, 10: task2}}};

    expect(getNextUndoneTask(state)).toBe(task2);

    state = {...state, route: {params: {slug: 'tag-2-slug'}}};

    expect(getNextUndoneTask(state)).toBe(task1);
  });

  it('returns undefined when there are no tasks', () => {
    const state = {route: {params: {}}, task: {byId: {}}, tag: tagState};

    expect(getNextUndoneTask(state)).toBeUndefined();
  });
});

describe('getTagMetaInfo', () => {
  describe('priority', () => {
    it('returns null priority for tags with no priority tasks', () => {
      const tag1 = {id: 1, rules: []};
      const tag2 = {id: 2, rules: []};
      const task1 = {
        id: 5,
        timeframe: null,
        tagIds: [2],
        subTasks: [],
        priority: null,
      };
      const state = {
        task: {byId: {5: task1}},
        tag: {byId: {1: tag1, 2: tag2}},
      };
      const expected = {1: {priority: null}, 2: {priority: null}};

      expect(getTagMetaInfo(state)).toEqual(expected);
    });

    it('returns the min priority for tasks with priority tasks', () => {
      const tag1 = {id: 1, rules: []};
      const task1 = {
        id: 5,
        timeframe: null,
        tagIds: [1],
        subTasks: [],
        priority: 3,
      };
      const task2 = {
        id: 6,
        timeframe: null,
        tagIds: [1],
        subTasks: [],
        priority: 1,
      };
      const state = {
        task: {byId: {5: task1, 6: task2}},
        tag: {byId: {1: tag1}},
      };
      expect(getTagMetaInfo(state)).toEqual({1: {priority: 1}});
    });

    it('returns the numeric priority when some tasks have priority', () => {
      const tag1 = {id: 1, rules: []};
      const task1 = {
        id: 5,
        timeframe: null,
        tagIds: [1],
        subTasks: [],
        priority: null,
      };
      const task2 = {
        id: 6,
        timeframe: null,
        tagIds: [1],
        subTasks: [],
        priority: 2,
      };
      const state = {
        task: {byId: {5: task1, 6: task2}},
        tag: {byId: {1: tag1}},
      };
      expect(getTagMetaInfo(state)).toEqual({1: {priority: 2}});
    });
  });
});
