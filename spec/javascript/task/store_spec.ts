import {expect, it, vi} from "vitest";

vi.mock(import("helpers/request"), async (importActual) => {
  const actual = await importActual();

  return {...actual, request: vi.fn<typeof actual.request>()};
});

import {ensure} from "helpers/ensure";
import {request} from "helpers/request";
import TaskStore from "javascript/task/store";

import {makeTask} from "support/factories";

it("notifies subscribed listeners", () => {
  const listener = vi.fn<() => void>();
  const unsubscribe = TaskStore.subscribe(listener);

  TaskStore.notifyListeners();
  unsubscribe();

  expect(listener).toHaveBeenCalledWith();
});

it("stops notifying once unsubscribed", () => {
  const listener = vi.fn<() => void>();
  const unsubscribe = TaskStore.subscribe(listener);

  unsubscribe();
  TaskStore.notifyListeners();

  expect(listener).not.toHaveBeenCalled();
});

it("marks itself unloaded and notifies on unload", () => {
  const listener = vi.fn<() => void>();
  TaskStore.subscribe(listener);
  TaskStore.loaded = true;

  TaskStore.unload();

  expect(TaskStore.loaded).toBe(false);
  expect(listener).toHaveBeenCalledWith();
});

it("stores models with estimate minutes and exposes them via getState", () => {
  const timed = makeTask({estimateSeconds: 600});
  const untimed = makeTask({estimateSeconds: null});

  TaskStore.updateModels({data: [timed, untimed]});

  const {loaded, tasks} = TaskStore.getState();

  expect(loaded).toBe(true);
  expect(ensure(tasks[0]).estimateMinutes).toBe(10);
  expect(ensure(tasks[1]).estimateMinutes).toBe(30);
});

it("fetches tasks when dispatched a FETCH action", () => {
  TaskStore.dispatch({type: "tasks/FETCH"});

  expect(vi.mocked(request)).toHaveBeenCalledWith(
    "/tasks",
    expect.objectContaining({method: "GET"}),
  );
});

it("throws when dispatched an unknown action", () => {
  expect(() => {
    TaskStore.dispatch({type: "bogus"});
  }).toThrow(/invalid action type bogus/u);
});
