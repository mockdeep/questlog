import {expect, it, vi} from "vitest";

import FakeTimers from "@sinonjs/fake-timers";

vi.mock(import("@sinonjs/fake-timers"), async (importActual) => {
  const actual = await importActual();
  const install = vi.fn<typeof actual.default.install>();

  return {
    ...actual,
    "default": {...actual.default, install},
  };
});

function addFreezeElement(timestamp: string): void {
  const element = document.createElement("div");
  element.className = "time-freeze";
  element.dataset.timestamp = timestamp;
  document.body.appendChild(element);
}

it("installs fake timers from the freeze element timestamp", async () => {
  document.body.innerHTML = "";
  addFreezeElement("123");
  vi.resetModules();

  await import("javascript/freeze_time");

  expect(vi.mocked(FakeTimers.install)).toHaveBeenCalledWith({
    now: 123,
    toFake: ["Date"],
  });
});

it("throws when the freeze element is missing", async () => {
  document.body.innerHTML = "";
  vi.resetModules();

  await expect(import("javascript/freeze_time"))
    .rejects.toThrow("element is not HTMLElement");
});
