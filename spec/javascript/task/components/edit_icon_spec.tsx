import {render, screen} from "@testing-library/react";
import {expect, it} from "vitest";

import TaskEditIcon from "javascript/task/components/edit_icon";

import {makeTask} from "support/factories";

it("links to the task edit page", () => {
  render(<TaskEditIcon task={makeTask({id: 9})} />);

  expect(screen.getByRole("link")).toHaveAttribute("href", "/tasks/9");
});

it("renders nothing when the task has no id", () => {
  const {container} = render(<TaskEditIcon task={makeTask({id: 0})} />);

  expect(container.querySelector("a")).toBeNull();
});
