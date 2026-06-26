import type {Mock} from "vitest";
import {expect, it, vi} from "vitest";

import {ajaxDelete, ajaxGet, ajaxPost, ajaxPut} from "helpers/ajax";

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

it("issues a GET request and resolves the parsed body", async () => {
  const fetchMock = stubFetch();

  const result: unknown = await ajaxGet("/tasks");

  expect(result).toStrictEqual(PAYLOAD);
  expect(fetchMock).toHaveBeenCalledWith(
    "/tasks",
    expect.objectContaining({method: "GET"}),
  );
});

it("issues a PUT request with a serialized body", async () => {
  const fetchMock = stubFetch();

  await ajaxPut("/tasks/1", {task: {}});

  expect(fetchMock).toHaveBeenCalledWith("/tasks/1", expect.objectContaining({
    body: JSON.stringify({task: {}}),
    method: "PUT",
  }));
});

it("issues a POST request with a serialized body", async () => {
  const fetchMock = stubFetch();

  await ajaxPost("/tags", {tag: {}});

  expect(fetchMock).toHaveBeenCalledWith("/tags", expect.objectContaining({
    body: JSON.stringify({tag: {}}),
    method: "POST",
  }));
});

it("issues a DELETE request", async () => {
  const fetchMock = stubFetch();

  await ajaxDelete("/tasks/1");

  expect(fetchMock).toHaveBeenCalledWith(
    "/tasks/1",
    expect.objectContaining({method: "DELETE"}),
  );
});
