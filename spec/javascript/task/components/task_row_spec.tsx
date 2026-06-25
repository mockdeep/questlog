import type {ReactElement} from "react";
import {fireEvent, render, screen} from "@testing-library/react";

import {ensure} from "helpers/ensure";
import {makeTask} from "support/factories";

import type {Props} from "javascript/task/components/task_row";
import TaskRow from "javascript/task/components/task_row";

const props: Props = {
  deleteTask: vi.fn(),
  updateTask: vi.fn(),
  task: makeTask(),
};

const fullSpace = {
  inbox: 60,
  today: 60,
  week: 60,
  month: 60,
  quarter: 60,
  year: 60,
  lustrum: 60,
  decade: 60,
};

function row(overrides: Partial<Props> = {}): ReactElement {
  return <table><tbody><TaskRow {...props} {...overrides} /></tbody></table>;
}

function prioritySelect(): HTMLElement {
  return ensure(screen.getAllByRole("combobox")[0]);
}

function timeframeSelect(): HTMLElement {
  return ensure(screen.getAllByRole("combobox")[1]);
}

it("renders a table row", () => {
  const {container} = render(row());

  expect(container.querySelector("tr")).toHaveClass("tasks-table__row");
});

it("adds a priority class for a prioritized task", () => {
  const {container} = render(row({task: makeTask({priority: 2})}));

  expect(container.querySelector("tr"))
    .toHaveClass("tasks-table__row--priority-2");
});

it("adds a status class when a status is given", () => {
  const {container} = render(row({status: "done"}));

  expect(container.querySelector("tr")).toHaveClass("tasks-table__row--done");
});

it("renders the task estimate", () => {
  render(row({task: makeTask({estimateMinutes: 45})}));

  expect(screen.getByText("45 min")).toBeInTheDocument();
});

it("renders a repeat emblem for a repeating task", () => {
  const {container} = render(row({task: makeTask({repeatSeconds: 86400})}));

  expect(container.querySelector("i.fa-redo-alt")).toBeInTheDocument();
});

it("renders no repeat emblem for a non-repeating task", () => {
  const {container} = render(row({task: makeTask({repeatSeconds: null})}));

  expect(container.querySelector("i.fa-redo-alt")).not.toBeInTheDocument();
});

it("marks the task done when DONE is clicked", () => {
  const updateTask = vi.fn();
  render(row({task: makeTask({id: 7}), updateTask}));

  fireEvent.click(screen.getByRole("button", {name: "DONE"}));

  expect(updateTask).toHaveBeenCalledWith(7, {done: true});
});

it("updates the priority when the priority select changes", () => {
  const updateTask = vi.fn();
  render(row({task: makeTask({id: 8}), updateTask}));

  fireEvent.change(prioritySelect(), {target: {value: "3"}});

  expect(updateTask).toHaveBeenCalledWith(8, {priority: 3});
});

it("updates the timeframe when the timeframe select changes", () => {
  const updateTask = vi.fn();
  render(row({task: makeTask({id: 9}), updateTask, timeframesEnabled: true}));

  fireEvent.change(timeframeSelect(), {target: {value: "week"}});

  expect(updateTask).toHaveBeenCalledWith(9, {timeframe: "week"});
});

it("renders the timeframe selector when enabled", () => {
  const {container} = render(row({timeframesEnabled: true}));

  expect(container.querySelector("select.timeframe-select"))
    .toBeInTheDocument();
});

it("does not render the timeframe selector when disabled", () => {
  const {container} = render(row());

  expect(container.querySelector("select.timeframe-select"))
    .not.toBeInTheDocument();
});

it("disables timeframe options without enough space once focused", () => {
  const task = makeTask({estimateMinutes: 30});
  const timeframeSpace = {...fullSpace, today: 10, week: 90};
  render(row({task, timeframesEnabled: true, timeframeSpace}));

  fireEvent.focus(timeframeSelect());

  const todayOption = screen.getByRole("option", {name: /Today/u});
  const weekOption = screen.getByRole("option", {name: /This Week/u});
  expect(todayOption).toBeDisabled();
  expect(weekOption).not.toBeDisabled();
  expect(weekOption).toHaveTextContent("This Week (90)");
});

it("deletes the task when DELETE is confirmed", () => {
  const deleteTask = vi.fn();
  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
  render(row({task: makeTask({id: 11}), deleteTask}));

  fireEvent.click(screen.getByRole("button", {name: "DELETE"}));

  expect(deleteTask).toHaveBeenCalledWith(11);
  confirmSpy.mockRestore();
});

it("does not delete the task when DELETE is cancelled", () => {
  const deleteTask = vi.fn();
  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);
  render(row({deleteTask}));

  fireEvent.click(screen.getByRole("button", {name: "DELETE"}));

  expect(deleteTask).not.toHaveBeenCalled();
  confirmSpy.mockRestore();
});

it("undoes the task when UNDO is clicked", () => {
  const updateTask = vi.fn();
  render(row({task: makeTask({id: 12, pending: true}), updateTask}));

  fireEvent.click(screen.getByRole("button", {name: "UNDO"}));

  expect(updateTask).toHaveBeenCalledWith(12, {done: false});
});

it("undoButton returns null for a non-pending task", () => {
  const instance = new TaskRow({...props, task: makeTask({pending: false})});

  expect(instance.undoButton()).toBeNull();
});

it("renders an undo button when task is pending", () => {
  render(row({task: makeTask({pending: true})}));

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(3);
  expect(screen.getByRole("button", {name: "UNDO"})).toBeInTheDocument();
});

it("does not render an undo button when task is not pending", () => {
  render(row({task: makeTask({pending: false})}));

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
  expect(screen.getByRole("button", {name: "DONE"})).toBeInTheDocument();
  expect(screen.getByRole("button", {name: "DELETE"})).toBeInTheDocument();
});
