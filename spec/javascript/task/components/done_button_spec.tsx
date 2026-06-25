import type {ComponentProps} from "react";
import {createRef} from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {expect, it, vi} from "vitest";

import {ensure} from "helpers/ensure";
import DoneButton from "javascript/task/components/done_button";

import {makeTask} from "support/factories";

type Props = ComponentProps<typeof DoneButton>;

function makeProps(overrides: Partial<Props> = {}): Props {
  return {
    completeTask: vi.fn<(taskId: number) => void>(),
    task: makeTask(),
    ...overrides,
  };
}

it("completes the task when ready and clicked", () => {
  const props = makeProps({task: makeTask({id: 4})});
  render(<DoneButton {...props} />);

  fireEvent.click(screen.getByRole("button"));

  expect(props.completeTask).toHaveBeenCalledWith(4);
});

it("does not complete the task when it is not ready", () => {
  const ref = createRef<DoneButton>();
  const props = makeProps({task: makeTask({loadingState: "marking_done"})});
  render(<DoneButton {...props} ref={ref} />);

  ensure(ref.current).markDone();

  expect(props.completeTask).not.toHaveBeenCalled();
});

it("shows a marking-done message and disables the button", () => {
  const props = makeProps({task: makeTask({loadingState: "marking_done"})});
  render(<DoneButton {...props} />);

  expect(screen.getByRole("button", {name: "Marking done..."})).toBeDisabled();
});

it("shows the default message and enables the button when ready", () => {
  const props = makeProps();
  render(<DoneButton {...props} />);

  const button = screen.getByRole("button", {name: "Done! Give me another!"});

  expect(button).toBeEnabled();
});
