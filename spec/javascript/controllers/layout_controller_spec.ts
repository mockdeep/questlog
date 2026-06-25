import {expect, it} from "vitest";

import {bootStimulus, getController} from "support/stimulus";
import {ensure} from "helpers/ensure";
import LayoutController from "controllers/layout_controller";

const HTML = `
  <div data-controller='layout'>
    <div data-layout-target='expandedSidebar'></div>
    <div data-layout-target='collapsedSidebar'></div>
  </div>
`;

async function setupController(width: number): Promise<HTMLElement> {
  window.innerWidth = width;
  document.body.innerHTML = HTML;

  await bootStimulus("layout", LayoutController);

  const selector = "[data-controller='layout']";

  return ensure(document.querySelector<HTMLElement>(selector));
}

function target(el: HTMLElement, name: string): HTMLElement {
  const selector = `[data-layout-target='${name}']`;

  return ensure(el.querySelector<HTMLElement>(selector));
}

it("opens the sidebar on a wide screen", async () => {
  const el = await setupController(1024);

  expect(el).toHaveClass("sidebar-open");
  expect(target(el, "collapsedSidebar")).toHaveClass("hide-me");
});

it("collapses the sidebar on a narrow screen", async () => {
  const el = await setupController(500);

  expect(el).not.toHaveClass("sidebar-open");
  expect(target(el, "expandedSidebar")).toHaveClass("hide-me");
});

it("hides the sidebar when hideSidebar is called", async () => {
  const el = await setupController(1024);

  getController(el, "layout", LayoutController).hideSidebar();

  expect(el).not.toHaveClass("sidebar-open");
});

it("shows the sidebar when showSidebar is called", async () => {
  const el = await setupController(500);

  getController(el, "layout", LayoutController).showSidebar();

  expect(el).toHaveClass("sidebar-open");
});
