import {render, screen} from "@testing-library/react";

import type {Props} from "javascript/task/components/nested_list";
import TaskNestedList from "javascript/task/components/nested_list";

import {makeTask} from "_test_helpers/factories";

const parentTask = makeTask({title: "I am the parent"});
const childTask = makeTask({title: "I am the child"});
const props: Props = {
  tasks: [parentTask],
  tasksByParentId: {[parentTask.id]: [childTask], [childTask.id]: []},
  updateTask: vi.fn(),
};

it("renders a parent list item when task has sub-tasks", () => {
  render(<TaskNestedList {...props} />);

  expect(screen.getByText("I am the parent")).toBeInTheDocument();
  expect(screen.getByText("I am the child")).toBeInTheDocument();
});

it("renders a leaf list item when task has no sub-tasks", () => {
  const overrides: Props = {...props, tasksByParentId: {[parentTask.id]: []}};
  render(<TaskNestedList {...overrides} />);

  expect(screen.getByText("I am the parent")).toBeInTheDocument();
  // Leaf items have checkboxes; parent items have disabled checkboxes
  expect(screen.getByRole("checkbox")).not.toBeDisabled();
});
