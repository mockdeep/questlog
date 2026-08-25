import {describe, expect, it, vi} from "vitest";

import TaskChangeNotifier from "javascript/task/change_notifier";

describe("subscribe", () => {
  it("notifies a subscribed listener", () => {
    const listener = vi.fn<() => void>();
    const unsubscribe = TaskChangeNotifier.subscribe(listener);

    TaskChangeNotifier.notifyListeners();

    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
  });

  it("returns a function that unsubscribes the listener", () => {
    const listener = vi.fn<() => void>();
    const unsubscribe = TaskChangeNotifier.subscribe(listener);

    unsubscribe();
    TaskChangeNotifier.notifyListeners();

    expect(listener).not.toHaveBeenCalled();
  });
});

describe("unsubscribe", () => {
  it("stops notifying the listener", () => {
    const listener = vi.fn<() => void>();
    TaskChangeNotifier.subscribe(listener);

    TaskChangeNotifier.unsubscribe(listener);
    TaskChangeNotifier.notifyListeners();

    expect(listener).not.toHaveBeenCalled();
  });
});

describe("notifyListeners", () => {
  it("does not raise an error when no listeners exist", () => {
    function notify(): void {
      TaskChangeNotifier.notifyListeners();
    }

    expect(notify).not.toThrow();
  });
});
