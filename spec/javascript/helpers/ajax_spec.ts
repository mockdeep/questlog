import type {Mock} from "vitest";
import {expect, it, vi} from "vitest";

import {ajaxDelete, ajaxPut} from "helpers/ajax";

const PAYLOAD = {data: "ok"};

interface FetchResult {
  json: () => Promise<unknown>;
}
type FetchMock = (url: string, opts: RequestInit) => Promise<FetchResult>;

function stubFetch(): Mock<FetchMock> {
  async function json(): Promise<unknown> {
    await Promise.resolve();

    return PAYLOAD;
  }

  const fetchMock: Mock<FetchMock> = vi.fn<FetchMock>();
  fetchMock.mockResolvedValue({json});
  vi.stubGlobal("fetch", fetchMock);

  return fetchMock;
}

it("issues a PUT request with a serialized body", async () => {
  const fetchMock = stubFetch();

  await ajaxPut("/tasks/1", {task: {}});

  expect(fetchMock).toHaveBeenCalledWith("/tasks/1", expect.objectContaining({
    body: JSON.stringify({task: {}}),
    method: "PUT",
  }));
});

it("resolves the parsed response body", async () => {
  stubFetch();

  const result: unknown = await ajaxPut("/tasks/1", {task: {}});

  expect(result).toStrictEqual(PAYLOAD);
});

it("issues a DELETE request", async () => {
  const fetchMock = stubFetch();

  await ajaxDelete("/tasks/1");

  expect(fetchMock).toHaveBeenCalledWith(
    "/tasks/1",
    expect.objectContaining({method: "DELETE"}),
  );
});
