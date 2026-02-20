import {render, screen} from "@testing-library/react";

import type {Props} from "javascript/task/components/parent_list_item";
import TaskParentListItem from "javascript/task/components/parent_list_item";

import {makeTask} from "_test_helpers/factories";

const task = makeTask({title: "foo title"});
const props: Props = {
  task,
  tasksByParentId: {[task.id]: []},
  updateTask: vi.fn(),
};

it("renders the task title", () => {
  render(<TaskParentListItem {...props} />);

  expect(screen.getByText("foo title")).toBeInTheDocument();
});

it("renders a new nested list", () => {
  const {container} = render(<TaskParentListItem {...props} />);

  expect(container.querySelector(".task-tree")).toBeInTheDocument();
});

it("renders a disabled checkbox for the task", () => {
  render(<TaskParentListItem {...props} />);

  expect(screen.getByRole("checkbox")).toBeDisabled();
});

it("adds a priority class to title when task has a priority", () => {
  const overrides = {task: {...task, priority: 2}};
  render(<TaskParentListItem {...props} {...overrides} />);

  const title = screen.getByText("foo title");
  expect(title).toHaveClass("task-item__title--priority-2");
});

it("does not add a priority class to title when task has no priority", () => {
  render(<TaskParentListItem {...props} />);

  expect(screen.getByText("foo title").className).not.toMatch("priority");
});
