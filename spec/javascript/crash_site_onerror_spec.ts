import {expect, it, vi} from "vitest";

import {ensure} from "helpers/ensure";

function setReadyState(value: string): void {
  Object.defineProperty(document, "readyState", {
    configurable: true,
    value,
  });
}

async function loadHandler(readyState: string): Promise<void> {
  document.body.innerHTML = "";
  setReadyState(readyState);
  vi.resetModules();

  await import("javascript/crash_site_onerror");
}

it("displays the error when the document is already complete", async () => {
  await loadHandler("complete");

  ensure(window.onerror)("boom", "/url", 1, 2, new Error("trace"));

  expect(document.body.innerHTML).toContain("boom");
  expect(document.body.innerHTML).toContain("Error: trace");
});

it("defers the error until the document becomes complete", async () => {
  await loadHandler("loading");

  ensure(window.onerror)("later", "/url", 1, 2, new Error("x"));
  document.dispatchEvent(new Event("readystatechange"));

  expect(document.body.innerHTML).not.toContain("later");

  setReadyState("complete");
  document.dispatchEvent(new Event("readystatechange"));

  expect(document.body.innerHTML).toContain("later");
});

it("handles a missing error object", async () => {
  await loadHandler("complete");

  ensure(window.onerror)("no error", "/url", 1, 2, undefined);

  expect(document.body.innerHTML).toContain("no error");
});

it("handles an error without a stack", async () => {
  await loadHandler("complete");
  const error = new Error("stackless");
  Reflect.deleteProperty(error, "stack");

  ensure(window.onerror)("stackless boom", "/url", 1, 2, error);

  expect(document.body.innerHTML).toContain("stackless boom");
});
