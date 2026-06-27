import {waitFor} from "@testing-library/react";
import {noop} from "lodash";
import {expect, it, vi} from "vitest";

import {bootStimulus, getController} from "support/stimulus";
import {ensure} from "helpers/ensure";
import ReactController from "controllers/react_controller";

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

/*
 * The render and its async store updates fire outside act(); silence the
 * resulting console warnings, which support/shims.ts otherwise turns into
 * throws.
 */
async function connectController(
  name: string,
  props = "{}",
): Promise<HTMLElement> {
  vi.spyOn(console, "error").mockImplementation(noop);
  stubFetch();
  window.history.pushState(null, "", "/tasks");
  document.body.innerHTML =
    `<div data-controller="react" data-react-component-name-value="${name}" ` +
    `data-react-props-value='${props}'></div>`;
  const selector = "[data-controller='react']";

  await bootStimulus("react", ReactController);

  return ensure(document.querySelector<HTMLElement>(selector));
}

it("mounts the named react component on connect", async () => {
  const el = await connectController("tasks");

  await waitFor(() => {
    expect(el.querySelector("div")).not.toBeNull();
  });
});

it("passes server-rendered props to the component", async () => {
  const tag = {rules: [{check: "isEmpty", field: "tagIds"}]};
  const el = await connectController("editTag", JSON.stringify({tag}));

  await waitFor(() => {
    expect(el.querySelector("select")).not.toBeNull();
  });
});

it("unmounts the component on disconnect", async () => {
  const el = await connectController("tasks");
  await waitFor(() => {
    expect(el.querySelector("div")).not.toBeNull();
  });

  getController(el, "react", ReactController).disconnect();

  expect(el.querySelector("div")).toBeNull();
});
