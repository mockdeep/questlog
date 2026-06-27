import {waitFor} from "@testing-library/react";
import {noop} from "lodash";
import {expect, it, vi} from "vitest";

import {bootStimulus, getController} from "support/stimulus";
import {ensure} from "helpers/ensure";
import ConnectedReactController from "controllers/connected_react_controller";

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
async function connectController(): Promise<HTMLElement> {
  vi.spyOn(console, "error").mockImplementation(noop);
  stubFetch();
  window.history.pushState(null, "", "/tasks");
  document.body.innerHTML =
    "<div data-controller='connected-react' " +
    "data-connected-react-component-name-value='tasks'></div>";
  const selector = "[data-controller='connected-react']";

  await bootStimulus("connected-react", ConnectedReactController);

  return ensure(document.querySelector<HTMLElement>(selector));
}

it("mounts the named react component on connect", async () => {
  const el = await connectController();

  await waitFor(() => {
    expect(el.querySelector("div")).not.toBeNull();
  });
});

it("unmounts the component on disconnect", async () => {
  const el = await connectController();
  await waitFor(() => {
    expect(el.querySelector("div")).not.toBeNull();
  });

  getController(el, "connected-react", ConnectedReactController).disconnect();

  expect(el.querySelector("div")).toBeNull();
});
