import {render, screen} from "@testing-library/react";

import {makeTask} from "support/factories";

import type {Props} from "javascript/task/components/sub_tasks_table";
import SubTasksTable from "javascript/task/components/sub_tasks_table";

const props: Props = {
  deleteTask: vi.fn(),
  updateTask: vi.fn(),
  subTasks: [],
};

it("renders sub-task rows", () => {
  const subTasks = [makeTask(), makeTask()];
  render(<SubTasksTable {...props} subTasks={subTasks} />);

  const rows = screen.getAllByRole("row");
  // Header row + 2 task rows
  expect(rows).toHaveLength(3);
});

it("returns null when there are no sub tasks", () => {
  const {container} = render(<SubTasksTable {...props} />);

  expect(container.firstChild).toBeNull();
});
