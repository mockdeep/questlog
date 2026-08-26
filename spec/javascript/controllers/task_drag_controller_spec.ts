import {noop} from "lodash";
import type {MockInstance} from "vitest";
import {expect, it, vi} from "vitest";

import {bootStimulus} from "support/stimulus";
import {ensure} from "helpers/ensure";
import TaskDragController from "controllers/task_drag_controller";

interface RowAttributes {
  id: number;
  position: number;
  priority?: number;
}

const ACTIONS = "dragstart->task-drag#start dragover->task-drag#move " +
  "dragend->task-drag#drop";

function priorityAttribute(priority: number | undefined): string {
  if (priority === undefined) { return ""; }

  return ` data-priority="${priority}"`;
}

function row({id, position, priority}: RowAttributes): string {
  return "<tr data-task-drag-target=\"row\" draggable=\"true\" " +
    `data-task-id="${id}" data-position="${position}"` +
    `${priorityAttribute(priority)}><td>task ${id}</td></tr>`;
}

let requestSubmit: MockInstance<() => void>;

async function setup(rows: RowAttributes[]): Promise<void> {
  requestSubmit = vi
    .spyOn(HTMLFormElement.prototype, "requestSubmit")
    .mockImplementation(noop);

  document.body.innerHTML =
    `<div data-controller="task-drag" data-action="${ACTIONS}">` +
    `<table><tbody>${rows.map(row).join("")}</tbody></table>` +
    "<form data-task-drag-target=\"form\">" +
    "<input type=\"hidden\" data-task-drag-target=\"position\">" +
    "<input type=\"hidden\" data-task-drag-target=\"priority\">" +
    "</form></div>";

  await bootStimulus("task-drag", TaskDragController);
}

function taskRow(id: number): HTMLElement {
  return ensure(document.querySelector<HTMLElement>(`[data-task-id="${id}"]`));
}

function dispatch(type: string, element: EventTarget): void {
  const event = new Event(type, {bubbles: true, cancelable: true});

  const dataTransfer = {setData: vi.fn<DataTransfer["setData"]>()};

  Object.defineProperty(event, "dataTransfer", {value: dataTransfer});
  element.dispatchEvent(event);
}

function drag(sourceId: number, targetId: number): void {
  dispatch("dragstart", taskRow(sourceId));
  dispatch("dragover", taskRow(targetId));
  dispatch("dragend", taskRow(sourceId));
}

function titles(): string[] {
  return [...document.querySelectorAll("tbody tr")]
    .map((element) => { return ensure(element.textContent); });
}

interface Submitted {
  action: string;
  position: string;
  priority: string;
}

function submitted(): Submitted {
  const form = ensure(document.querySelector<HTMLFormElement>("form"));
  const inputs = form.querySelectorAll<HTMLInputElement>("input");

  return {
    action: form.getAttribute("action") ?? "",
    position: ensure(inputs[0]).value,
    priority: ensure(inputs[1]).value,
  };
}

it("moves a dragged task down past the task it is dropped on", async () => {
  await setup([
    {id: 1, position: 1},
    {id: 2, position: 2},
    {id: 3, position: 3},
  ]);

  drag(1, 2);

  expect(titles()).toStrictEqual(["task 2", "task 1", "task 3"]);
});

it("moves a dragged task up past the task it is dropped on", async () => {
  await setup([
    {id: 1, position: 1},
    {id: 2, position: 2},
    {id: 3, position: 3},
  ]);

  drag(3, 1);

  expect(titles()).toStrictEqual(["task 3", "task 1", "task 2"]);
});

it("marks the dragged row while it is being dragged", async () => {
  await setup([{id: 1, position: 1}, {id: 2, position: 2}]);

  dispatch("dragstart", taskRow(1));

  expect(taskRow(1).className).toBe("tasks-table__row--dragging");
});

it("unmarks the dragged row once it is dropped", async () => {
  await setup([{id: 1, position: 1}, {id: 2, position: 2}]);

  drag(1, 2);

  expect(taskRow(1).className).toBe("");
});

it("ignores a drag over the row being dragged", async () => {
  await setup([{id: 1, position: 1}, {id: 2, position: 2}]);

  dispatch("dragstart", taskRow(1));
  dispatch("dragover", taskRow(1));

  expect(titles()).toStrictEqual(["task 1", "task 2"]);
});

it("ignores a drag over something that is not a task row", async () => {
  await setup([{id: 1, position: 1}, {id: 2, position: 2}]);

  dispatch("dragstart", taskRow(1));
  dispatch("dragover", ensure(document.querySelector<HTMLElement>("form")));

  expect(titles()).toStrictEqual(["task 1", "task 2"]);
});

it("ignores a drag over a text node", async () => {
  await setup([{id: 1, position: 1}, {id: 2, position: 2}]);
  const cell = ensure(taskRow(2).querySelector("td"));

  dispatch("dragstart", taskRow(1));
  dispatch("dragover", ensure(cell.firstChild));

  expect(titles()).toStrictEqual(["task 1", "task 2"]);
});

it("ignores a drag that did not start on a task row", async () => {
  await setup([{id: 1, position: 1}, {id: 2, position: 2}]);

  dispatch("dragstart", ensure(document.querySelector<HTMLElement>("form")));
  dispatch("dragover", taskRow(2));

  expect(titles()).toStrictEqual(["task 1", "task 2"]);
});

it("ignores a drop that did not start on a task row", async () => {
  await setup([{id: 1, position: 1}, {id: 2, position: 2}]);

  dispatch("dragend", taskRow(1));

  expect(requestSubmit).not.toHaveBeenCalled();
});

it("saves the dropped task against its own url", async () => {
  await setup([{id: 1, position: 1}, {id: 2, position: 2}]);

  drag(1, 2);

  expect(submitted().action).toBe("/tasks/1");
  expect(requestSubmit).toHaveBeenCalledTimes(1);
});

it("takes the position of the task it displaced when moved down", async () => {
  await setup([
    {id: 1, position: 1},
    {id: 2, position: 2},
    {id: 3, position: 3},
  ]);

  drag(1, 3);

  expect(submitted().position).toBe("3");
});

it("takes the position of the task it displaced when moved up", async () => {
  await setup([
    {id: 1, position: 1},
    {id: 2, position: 2},
    {id: 3, position: 3},
  ]);

  drag(3, 1);

  expect(submitted().position).toBe("1");
});

it("keeps its position when the task has not moved", async () => {
  await setup([{id: 1, position: 1}, {id: 2, position: 2}]);

  dispatch("dragstart", taskRow(1));
  dispatch("dragend", taskRow(1));

  expect(submitted().position).toBe("1");
});

it("takes the priority below it when moved to the top", async () => {
  await setup([
    {id: 1, position: 1, priority: 2},
    {id: 2, position: 2, priority: 3},
    {id: 3, position: 3},
  ]);

  drag(3, 1);

  expect(submitted().priority).toBe("2");
});

it("takes the priority above it when moved to the bottom", async () => {
  await setup([
    {id: 1, position: 1, priority: 2},
    {id: 2, position: 2, priority: 3},
    {id: 3, position: 3, priority: 3},
  ]);

  drag(1, 3);

  expect(submitted().priority).toBe("3");
});

it("clears its priority when the task above it has none", async () => {
  await setup([
    {id: 1, position: 1, priority: 2},
    {id: 2, position: 2, priority: 3},
    {id: 3, position: 3},
  ]);

  drag(2, 3);

  expect(submitted().priority).toBe("");
});

it("keeps its priority when it matches the task below", async () => {
  await setup([
    {id: 1, position: 1, priority: 2},
    {id: 2, position: 2, priority: 3},
    {id: 3, position: 3, priority: 3},
  ]);

  drag(3, 2);

  expect(submitted().priority).toBe("3");
});

it("keeps its priority when it matches the task above", async () => {
  await setup([
    {id: 1, position: 1, priority: 2},
    {id: 2, position: 2, priority: 2},
    {id: 3, position: 3, priority: 3},
  ]);

  drag(1, 2);

  expect(submitted().priority).toBe("2");
});

it("takes the priority below it when neither neighbour matches", async () => {
  await setup([
    {id: 1, position: 1, priority: 1},
    {id: 2, position: 2, priority: 2},
    {id: 3, position: 3, priority: 3},
  ]);

  drag(1, 2);

  expect(submitted().priority).toBe("3");
});

it("keeps its priority when the task below is less urgent", async () => {
  await setup([
    {id: 1, position: 1, priority: 3},
    {id: 2, position: 2, priority: 1},
  ]);

  drag(2, 1);

  expect(submitted().priority).toBe("1");
});
