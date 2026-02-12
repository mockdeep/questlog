import {render, screen} from "@testing-library/react";

import TaskLink from "src/task/components/link";

import {makeTask} from "_test_helpers/factories";

it("renders a link to the task", () => {
  const task = makeTask({title: "my title"});
  render(<TaskLink task={task} />);

  const link = screen.getByRole("link", {name: "my title"});

  expect(link).toHaveAttribute("href", `/tasks/${task.id}`);
  expect(link).toHaveClass("task-link");
});
