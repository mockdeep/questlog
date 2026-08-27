import {getActiveTasks} from "javascript/task/selectors";

import {makeState, makeTask} from "support/factories";

describe("getActiveTasks", () => {
  it("returns tasks", () => {
    const task1 = makeTask({title: "some task"});
    const task2 = makeTask({title: "some other task"});
    const state = makeState({task: [task1, task2]});

    expect(getActiveTasks(state)).toEqual([task1, task2]);
  });

  it("does not return tasks with a \"pending\" status", () => {
    const task1 = makeTask({title: "some task", status: "pending"});
    const task2 = makeTask({title: "some other task"});
    const state = makeState({task: [task1, task2]});

    expect(getActiveTasks(state)).toEqual([task2]);
  });

  it("does not return tasks with a \"done\" status", () => {
    const task1 = makeTask({title: "some task", status: "done"});
    const task2 = makeTask({title: "some other task"});
    const state = makeState({task: [task1, task2]});

    expect(getActiveTasks(state)).toEqual([task2]);
  });

  it("does not return tasks with sub tasks", () => {
    const task1 = makeTask({title: "some task"});
    const task2 = makeTask({title: "some other task"});
    const task3 = makeTask({title: "some child task", parentTaskId: task2.id});
    const state = makeState({task: [task1, task2, task3]});

    expect(getActiveTasks(state)).toEqual([task1, task3]);
  });

  it("orders tasks by their timeframe position", () => {
    const week = makeTask({timeframe: "week"});
    const today = makeTask({timeframe: "today"});
    const state = makeState({task: [week, today]});

    expect(getActiveTasks(state)).toEqual([today, week]);
  });
});
