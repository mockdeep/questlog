import type {Mock} from "vitest";
import {expect, it, vi} from "vitest";

import {request} from "helpers/request";

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

it("sends a PUT and passes the response to success", async () => {
  const fetchMock = stubFetch();
  const success = vi.fn<(data: unknown) => void>();

  request("/tasks/1", {data: {task: {}}, success});

  await vi.waitFor(() => {
    expect(success).toHaveBeenCalledWith(PAYLOAD);
  });

  expect(fetchMock).toHaveBeenCalledWith("/tasks/1", expect.objectContaining({
    body: JSON.stringify({task: {}}),
    method: "PUT",
  }));
});

it("uses GET when the method is GET", async () => {
  const fetchMock = stubFetch();
  const success = vi.fn<(data: unknown) => void>();

  request("/tasks", {method: "GET", success});

  await vi.waitFor(() => {
    expect(success).toHaveBeenCalledWith(PAYLOAD);
  });

  expect(fetchMock).toHaveBeenCalledWith(
    "/tasks",
    expect.objectContaining({method: "GET"}),
  );
});
