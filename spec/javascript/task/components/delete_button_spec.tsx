import type {ComponentProps} from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {expect, it, vi} from "vitest";

import DeleteButton from "javascript/task/components/delete_button";

import {makeTask} from "support/factories";

type Props = ComponentProps<typeof DeleteButton>;

function makeProps(overrides: Partial<Props> = {}): Props {
  return {
    deleteTask: vi.fn<(taskId: number) => void>(),
    task: makeTask(),
    ...overrides,
  };
}

it("deletes the task when the deletion is confirmed", () => {
  const props = makeProps({task: makeTask({id: 8})});
  vi.spyOn(window, "confirm").mockReturnValue(true);
  render(<DeleteButton {...props} />);

  fireEvent.click(screen.getByTitle("delete task"));

  expect(props.deleteTask).toHaveBeenCalledWith(8);
});

it("does not delete the task when the deletion is cancelled", () => {
  const props = makeProps();
  vi.spyOn(window, "confirm").mockReturnValue(false);
  render(<DeleteButton {...props} />);

  fireEvent.click(screen.getByTitle("delete task"));

  expect(props.deleteTask).not.toHaveBeenCalled();
});
