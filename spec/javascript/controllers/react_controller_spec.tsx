import {waitFor} from "@testing-library/react";
import {noop} from "lodash";
import {expect, it, vi} from "vitest";

import {bootStimulus, getController} from "support/stimulus";
import {ensure} from "helpers/ensure";
import ReactController from "controllers/react_controller";

// The built-in tag every task falls under, so the focus view has one to show.
const ALL_TAG = {
  id: 0,
  name: "All",
  priority: null,
  rules: [{check: "isActive"}],
  slug: "",
  tasks: [],
};

/*
 * The render fires outside act(); silence the resulting console warnings,
 * which support/shims.ts otherwise turns into throws.
 */
async function connectController(
  name: string,
  {
    route = "{\"name\":\"root\",\"params\":{}}",
    tags = JSON.stringify([ALL_TAG]),
    tasks = "[]",
  } = {},
): Promise<HTMLElement> {
  vi.spyOn(console, "error").mockImplementation(noop);
  document.body.innerHTML =
    "<div data-controller=\"react\" " +
    `data-react-component-name-value="${name}" ` +
    `data-react-tasks-value='${tasks}' ` +
    `data-react-tags-value='${tags}' ` +
    `data-react-route-value='${route}'></div>`;
  const selector = "[data-controller='react']";

  await bootStimulus("react", ReactController);

  return ensure(document.querySelector<HTMLElement>(selector));
}

it("mounts the named react component on connect", async () => {
  const el = await connectController("focus");

  await waitFor(() => {
    expect(el.querySelector("div")).not.toBeNull();
  });
});

it("renders the tasks given on the mount element", async () => {
  const task = {
    done: false,
    estimateSeconds: null,
    id: 1,
    parentTaskId: null,
    pending: false,
    position: 1,
    priority: null,
    releaseAt: null,
    repeatSeconds: null,
    skipCount: 0,
    status: "active",
    tagIds: [],
    tagNames: [],
    timeframe: null,
    title: "wash the dishes",
  };
  const el = await connectController("focus", {tasks: JSON.stringify([task])});

  await waitFor(() => {
    expect(el.textContent).toContain("wash the dishes");
  });
});

it("unmounts the component on disconnect", async () => {
  const el = await connectController("focus");
  await waitFor(() => {
    expect(el.querySelector("div")).not.toBeNull();
  });

  getController(el, "react", ReactController).disconnect();

  expect(el.querySelector("div")).toBeNull();
});
