import type {Mock} from "vitest";
import {expect, it, vi} from "vitest";

import {bootStimulus} from "support/stimulus";
import {ensure} from "helpers/ensure";
import TaskTitleController from "controllers/task_title_controller";

const ACTIONS = "focus->task-title#reveal input->task-title#resize " +
  "keydown->task-title#saveOnEnter change->task-title#save";

function doNothing(): void { /* Stands in for a real submit */ }

async function setup(): Promise<HTMLTextAreaElement> {
  document.body.innerHTML =
    "<form><textarea class=\"task-input hidden-border\" " +
    "data-controller=\"task-title\" " +
    `data-action="${ACTIONS}">a task</textarea></form>`;

  await bootStimulus("task-title", TaskTitleController);

  return ensure(document.querySelector<HTMLTextAreaElement>("textarea"));
}

// Jsdom lays nothing out, so the field must be told how tall its content is
function withContentHeight(field: HTMLTextAreaElement, height: number): void {
  Object.defineProperty(field, "scrollHeight", {
    configurable: true,
    value: height,
  });
}

function stubSubmit(): Mock<() => void> {
  return vi.spyOn(HTMLFormElement.prototype, "requestSubmit")
    .mockImplementation(doNothing);
}

it("sizes itself to its content when it connects", async () => {
  const field = await setup();

  expect(field.style.height).not.toBe("");
});

it("resizes as the title is typed into", async () => {
  const field = await setup();
  withContentHeight(field, 40);

  field.dispatchEvent(new Event("input", {bubbles: true}));

  expect(field.style.height).toBe("40px");
});

it("leaves room for the borders of a border-box field", async () => {
  const field = await setup();
  withContentHeight(field, 40);
  field.style.boxSizing = "border-box";
  field.style.borderTopWidth = "2px";
  field.style.borderBottomWidth = "3px";

  field.dispatchEvent(new Event("input", {bubbles: true}));

  expect(field.style.height).toBe("45px");
});

it("leaves no extra room when the borders sit outside the field", async () => {
  const field = await setup();
  withContentHeight(field, 40);
  field.style.boxSizing = "content-box";
  field.style.borderTopWidth = "2px";
  field.style.borderBottomWidth = "3px";

  field.dispatchEvent(new Event("input", {bubbles: true}));

  expect(field.style.height).toBe("40px");
});

it("shows its border once it has been focused", async () => {
  const field = await setup();

  field.dispatchEvent(new Event("focus", {bubbles: true}));

  expect(field.classList.contains("hidden-border")).toBe(false);
});

it("saves when the title has been changed and the field is left", async () => {
  const requestSubmit = stubSubmit();
  const field = await setup();

  field.dispatchEvent(new Event("change", {bubbles: true}));

  expect(requestSubmit).toHaveBeenCalledTimes(1);
});

it("saves when enter is pressed", async () => {
  const requestSubmit = stubSubmit();
  const field = await setup();
  const enter = new KeyboardEvent("keydown", {bubbles: true, key: "Enter"});

  field.dispatchEvent(enter);

  expect(requestSubmit).toHaveBeenCalledTimes(1);
});

it("leaves other keys to type into the field", async () => {
  const requestSubmit = stubSubmit();
  const field = await setup();

  field.dispatchEvent(new KeyboardEvent("keydown", {bubbles: true, key: "a"}));

  expect(requestSubmit).not.toHaveBeenCalled();
});
