vi.mock("helpers/request", async (importOriginal: () => Promise<object>) => {
  const original = await importOriginal();
  return {...original, request: vi.fn()};
});
import type {Mock} from "vitest";

import {noop} from "lodash";

import {grab} from "helpers/grab";
import {request} from "helpers/request";
import TaskChangeNotifier from "javascript/task/change_notifier";
import TimeframeStore from "javascript/timeframe/store";

function respondWith(timeframes: unknown[]): void {
  const call = grab((request as Mock).mock.calls, 0);

  grab(call, 1).success({data: timeframes, meta: {medianProductivity: 15}});
}

function serverTimeframe(attrs: object = {}): object {
  return {
    name: "inbox",
    currentTasks: [],
    pendingTasks: [],
    minuteMax: null,
    minuteTotal: 0,
    ...attrs,
  };
}

describe("getAll", () => {
  it("resolves with the timeframes the server laid out", async () => {
    (request as Mock).mockClear();
    const promise = TimeframeStore.getAll();

    respondWith([serverTimeframe({name: "today", minuteMax: 90})]);

    const {timeframes} = await promise;
    expect(grab(timeframes, 0)).toMatchObject({name: "today", minuteMax: 90});
  });

  it("reads a timeframe with no maximum as holding any amount", async () => {
    (request as Mock).mockClear();
    const promise = TimeframeStore.getAll();

    respondWith([serverTimeframe()]);

    const {timeframes} = await promise;
    expect(grab(timeframes, 0).minuteMax).toBe(Infinity);
  });

  it("resolves with the median productivity the server reported", async () => {
    (request as Mock).mockClear();
    const promise = TimeframeStore.getAll();

    respondWith([]);

    const {meta} = await promise;
    expect(meta.medianProductivity).toBe(15);
  });

  it("does not fetch the tasks separately", () => {
    (request as Mock).mockClear();

    TimeframeStore.getAll().catch(noop);

    expect(request).toHaveBeenCalledTimes(1);
  });

  it("unloads when a task changes", () => {
    TimeframeStore.loaded = true;

    TaskChangeNotifier.notifyListeners();

    expect(TimeframeStore.loaded).toBe(false);
  });
});

describe("subscribe", () => {
  it("subscribes a listener", () => {
    const listener = vi.fn();

    TimeframeStore.subscribe(listener);

    TimeframeStore.notifyListeners();
    expect(listener).toHaveBeenCalled();

    TimeframeStore.unsubscribe(listener);
  });
});

describe("unsubscribe", () => {
  it("unsubscribes a listener", () => {
    const listener = vi.fn();
    TimeframeStore.subscribe(listener);

    TimeframeStore.unsubscribe(listener);

    TimeframeStore.notifyListeners();
    expect(listener).not.toHaveBeenCalled();
  });
});

describe("notifyListeners", () => {
  it("notifies all listeners", () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    TimeframeStore.subscribe(listener1);
    TimeframeStore.subscribe(listener2);

    TimeframeStore.notifyListeners();

    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();

    TimeframeStore.unsubscribe(listener1);
    TimeframeStore.unsubscribe(listener2);
  });

  it("does not raise an error when no listeners exist", () => {
    expect(TimeframeStore.listeners).toHaveLength(0);

    expect(() => TimeframeStore.notifyListeners()).not.toThrow();
  });
});

describe("unload", () => {
  it("sets loaded to false", () => {
    TimeframeStore.loaded = true;

    TimeframeStore.unload();

    expect(TimeframeStore.loaded).toBe(false);
  });

  it("notifies listeners", () => {
    const listener = vi.fn();
    TimeframeStore.subscribe(listener);

    TimeframeStore.unload();

    expect(listener).toHaveBeenCalled();
  });
});
