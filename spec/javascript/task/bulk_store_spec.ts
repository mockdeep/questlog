import {expect, it, vi} from "vitest";

vi.mock(import("helpers/request"), async (importActual) => {
  const actual = await importActual();

  return {...actual, request: vi.fn<typeof actual.request>()};
});

import {request} from "helpers/request";
import BulkTaskStore from "javascript/task/bulk_store";

/*
 * Notifying fires a module-level listener that dispatches the real fetchTasks
 * thunk; shape fetch so that thunk resolves cleanly instead of rejecting.
 */
function stubFetch(): void {
  function fakeJson(): unknown {
    return {data: [], included: []};
  }

  async function fakeFetch(): Promise<{json: () => unknown}> {
    await Promise.resolve();

    return {json: fakeJson};
  }

  vi.stubGlobal("fetch", fakeFetch);
}

it("notifies subscribed listeners", () => {
  stubFetch();
  const listener = vi.fn<() => void>();
  const unsubscribe = BulkTaskStore.subscribe(listener);

  BulkTaskStore.notifyListeners();
  unsubscribe();

  expect(listener).toHaveBeenCalledWith();
});

it("stops notifying once unsubscribed", () => {
  stubFetch();
  const listener = vi.fn<() => void>();
  const unsubscribe = BulkTaskStore.subscribe(listener);

  unsubscribe();
  BulkTaskStore.notifyListeners();

  expect(listener).not.toHaveBeenCalled();
});

it("marks itself unloaded and notifies on unload", () => {
  stubFetch();
  const listener = vi.fn<() => void>();
  BulkTaskStore.subscribe(listener);
  BulkTaskStore.loaded = true;

  BulkTaskStore.unload();

  expect(BulkTaskStore.loaded).toBe(false);
  expect(listener).toHaveBeenCalledWith();
});

it("sends the bulk payload through request on update", () => {
  const attrs = {positions: [1, 2, 3]};
  BulkTaskStore.update(attrs);

  const data = {[BulkTaskStore.name]: attrs};

  expect(vi.mocked(request)).toHaveBeenCalledWith(
    "/bulk_task",
    expect.objectContaining({data}),
  );
});
