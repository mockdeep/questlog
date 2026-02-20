import {fireEvent, render, screen} from "@testing-library/react";

import TaskLeafListItem from "javascript/task/components/leaf_list_item";

import {makeTask} from "support/factories";

const task = makeTask({title: "some title"});
const updateTask = vi.fn();
const props = {task, updateTask};

it("renders the task title", () => {
  render(<TaskLeafListItem {...props} />);

  expect(screen.getByText("some title")).toBeInTheDocument();
});

it("renders a task checkbox", () => {
  render(<TaskLeafListItem {...props} />);

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
  expect(checkbox).not.toBeDisabled();
});

it("sets the task checkbox to \"checked\" when task is \"done\"", () => {
  const overrides = {task: makeTask({status: "done"})};

  render(<TaskLeafListItem {...props} {...overrides} />);

  expect(screen.getByRole("checkbox")).toBeChecked();
});

it("updates the task to done when the checkbox gets checked", () => {
  render(<TaskLeafListItem {...props} />);

  fireEvent.click(screen.getByRole("checkbox"));

  expect(updateTask).toHaveBeenCalledTimes(1);
  expect(updateTask).toHaveBeenCalledWith(task.id, {done: true});
});

it("updates the task to not done when the checkbox gets unchecked", () => {
  const doneTask = makeTask({status: "done"});
  render(<TaskLeafListItem {...{...props, task: doneTask}} />);

  fireEvent.click(screen.getByRole("checkbox"));

  expect(updateTask).toHaveBeenLastCalledWith(doneTask.id, {done: false});
});

it("adds a priority class to title when task has a priority", () => {
  const overrides = {task: {...task, priority: 2}};
  render(<TaskLeafListItem {...props} {...overrides} />);

  const title = screen.getByText("some title");
  expect(title).toHaveClass("task-item__title--priority-2");
});

it("does not add a priority class to title when task has no priority", () => {
  render(<TaskLeafListItem {...props} />);

  expect(screen.getByText("some title").className).not.toMatch("priority");
});
