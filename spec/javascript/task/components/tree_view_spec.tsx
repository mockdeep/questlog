import React from "react";
import {render, screen} from "@testing-library/react";

import TaskTreeView from "src/task/components/tree_view";

import {makeTask} from "_test_helpers/factories";

const parentTask = makeTask({title: "I am the parent"});
const childTask = makeTask({title: "I am the child"});
const tasksByParentId = {[parentTask.id]: [childTask], [childTask.id]: []};
const updateTask = vi.fn();
const props = {
  tasks: [parentTask],
  tasksByParentId,
  updateTask,
};

it("renders a nested task list for each task", () => {
  render(<TaskTreeView {...props} />);

  expect(screen.getByText("I am the parent")).toBeInTheDocument();
  expect(screen.getByText("I am the child")).toBeInTheDocument();
});
