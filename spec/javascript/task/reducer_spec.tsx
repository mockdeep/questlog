import {
  setTasks,
  INIT, SET, UPDATE, UPDATE_META,
} from "javascript/task/action_creators";
import taskReducer from "javascript/task/reducer";

import {makeTask, makeTaskState} from "_test_helpers/factories";

describe(INIT, () => {
  it("sets up the basic structure for the store", () => {
    const expectedState = {
      byId: {},
      meta: {postponeSeconds: 300, ajaxState: "loading"},
    };

    expect(taskReducer(null, {type: INIT})).toEqual(expectedState);
  });
});

describe(SET, () => {
  it("replaces the existing tasks", () => {
    const previousState = makeTaskState({tasks: [makeTask()]});
    const task1 = makeTask({title: "a task"});
    const task2 = makeTask({title: "wat task"});
    const action = {type: SET, payload: [task2, task1]};
    const expectedState = makeTaskState({tasks: [task1, task2]});

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });

  it("sets empty state when no tasks", () => {
    const previousState = makeTaskState({tasks: [makeTask()]});
    const action = setTasks([]);
    const expectedState = makeTaskState({tasks: []});

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });

  it("sets estimateMinutes for subTasks", () => {
    const previousState = makeTaskState();
    const task1 = makeTask({title: "a task", parentTaskId: 5});
    const task2 = makeTask({title: "wat task"});
    const action = {type: SET, payload: [task1, task2]};

    const expectedTasks: Task[] = [
      {
        ...task1,
        estimateMinutes: 30,
        loadingState: "ready",
      }, {
        ...task2,
        estimateMinutes: 30,
        loadingState: "ready",
      },
    ];
    const expectedState = makeTaskState({tasks: expectedTasks});

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });
});

describe(UPDATE, () => {
  it("updates the task in the store", () => {
    const task = makeTask({title: "foo"});
    const previousState = makeTaskState({tasks: [task]});
    const payload = {id: task.id, title: "bar", estimateSeconds: 60};
    const action = {type: UPDATE, payload};
    const expectedTask = {...task, ...payload, estimateMinutes: 1};
    const expectedState = makeTaskState({tasks: [expectedTask]});

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });

  it("preserves the loading state passed through the task attributes", () => {
    const task = makeTask({title: "foo"});
    const previousState = makeTaskState({tasks: [task]});
    const payload = {id: task.id, loadingState: "updating"};
    const action = {type: UPDATE, payload};
    const expectedTask: Task = {...task, loadingState: "updating"};
    const expectedState = makeTaskState({tasks: [expectedTask]});

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });
});

describe(UPDATE_META, () => {
  it("updates meta information in the state", () => {
    const previousState = makeTaskState({meta: {ajaxState: "fetching"}});
    const action = {type: UPDATE_META, payload: {ajaxState: "ready"}};
    const expectedState = makeTaskState({meta: {ajaxState: "ready"}});

    expect(taskReducer(previousState, action)).toEqual(expectedState);
  });
});
