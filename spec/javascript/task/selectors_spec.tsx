import {
  getCurrentSubTasks,
  getCurrentTask,
  getPartitionedLeafTasks,
  getPartitionedRootTasks,
  getPartitionedTasks,
  getActiveTasks,
} from "javascript/task/selectors";

import {makeState, makeTask} from "support/factories";

describe("getCurrentTask", () => {
  it("returns the current task represented in the route", () => {
    const task = makeTask({title: "foo task"});
    const state = makeState({route: {params: {taskId: task.id}}, task: [task]});

    expect(getCurrentTask(state)).toEqual(task);
  });

  it("returns null when task in route is not present", () => {
    const task = makeTask({title: "foo task"});
    const state = makeState({route: {params: {taskId: 0}}, task: [task]});

    expect(getCurrentTask(state)).toBeNull();
  });

  it("returns null when the route has no task id", () => {
    const state = makeState({task: [makeTask()]});

    expect(getCurrentTask(state)).toBeNull();
  });
});

describe("getCurrentSubTasks", () => {
  it("returns the sub tasks of the current task", () => {
    const parent = makeTask();
    const child = makeTask({parentTaskId: parent.id});
    const params = {taskId: parent.id};
    const state = makeState({route: {params}, task: [parent, child]});

    expect(getCurrentSubTasks(state)).toEqual([child]);
  });

  it("returns an empty array when there is no current task", () => {
    const state = makeState({route: {params: {taskId: 0}}, task: []});

    expect(getCurrentSubTasks(state)).toEqual([]);
  });

  it("returns an empty array when the current task is filtered out", () => {
    const task = makeTask({status: "done"});
    const params = {taskId: task.id};
    const state = makeState({route: {params}, task: [task]});

    expect(getCurrentSubTasks(state)).toEqual([]);
  });
});

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
});

describe("getPartitionedLeafTasks", () => {
  it("returns leaf tasks partitioned on pending status", () => {
    const task1 = makeTask({status: "pending"});
    const task2 = makeTask();
    const task3 = makeTask({parentTaskId: task2.id});
    const task4 = makeTask({status: "done"});

    const state = makeState({task: [task1, task2, task3, task4]});

    const expected = {active: [task3], pending: [task1]};
    expect(getPartitionedLeafTasks(state)).toEqual(expected);
  });
});

describe("getPartitionedRootTasks", () => {
  it("returns root tasks partitioned on pending status", () => {
    const task1 = makeTask({status: "pending"});
    const task2 = makeTask();
    const task3 = makeTask({parentTaskId: task2.id});
    const task4 = makeTask({status: "done"});

    const state = makeState({task: [task1, task2, task3, task4]});

    const expected = {active: [task2], pending: [task1]};
    expect(getPartitionedRootTasks(state)).toEqual(expected);
  });
});

describe("getPartitionedTasks", () => {
  it("returns tasks partitioned on pending status", () => {
    const task1 = makeTask({status: "pending"});
    const task2 = makeTask();
    const task3 = makeTask({parentTaskId: task2.id});
    const task4 = makeTask({status: "done"});

    const state = makeState({task: [task1, task2, task3, task4]});

    const expected = {active: [task2, task3], pending: [task1]};
    expect(getPartitionedTasks(state)).toEqual(expected);
  });

  it("orders active tasks by their timeframe position", () => {
    const week = makeTask({timeframe: "week"});
    const today = makeTask({timeframe: "today"});
    const state = makeState({task: [week, today]});

    expect(getPartitionedTasks(state).active).toEqual([today, week]);
  });
});
