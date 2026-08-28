import {expect, it, vi} from "vitest";

function addFreezeElement(timestamp: string): void {
  document.body.innerHTML = "";

  const element = document.createElement("div");
  element.className = "time-freeze";
  element.dataset.timestamp = timestamp;
  document.body.appendChild(element);
}

async function loadFreezeTime(timestamp: string): Promise<void> {
  addFreezeElement(timestamp);
  vi.resetModules();

  await import("javascript/freeze_time");
}

it("freezes the clock at the freeze element's timestamp", async () => {
  await loadFreezeTime("123");

  expect(Date.now()).toBe(123);
});

it("leaves the clock alone when a later visit runs it again", async () => {
  await loadFreezeTime("123");
  await loadFreezeTime("456");

  expect(Date.now()).toBe(123);
});

it("throws when the freeze element is missing", async () => {
  document.body.innerHTML = "";
  vi.resetModules();

  await expect(import("javascript/freeze_time"))
    .rejects.toThrow("element is not HTMLElement");
});
