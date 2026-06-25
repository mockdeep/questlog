import {fireEvent, render, screen} from "@testing-library/react";

import {ensure} from "helpers/ensure";
import {makeTask} from "support/factories";

import type {Props} from "javascript/task/components/postpone_button";
import PostponeButton from "javascript/task/components/postpone_button";

function makeProps(overrides: Partial<Props> = {}): Props {
  return {
    disabled: false,
    postponeTask: vi.fn(),
    storePostponeSeconds: vi.fn(),
    task: makeTask(),
    ...overrides,
  };
}

it("renders a select tag", () => {
  render(<PostponeButton {...makeProps()} />);

  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

it("postpones the task when the button is clicked", () => {
  const props = makeProps({task: makeTask({id: 5})});
  const {container} = render(<PostponeButton {...props} />);

  fireEvent.click(ensure(container.querySelector("#postpone")));

  expect(props.postponeTask).toHaveBeenCalledWith(5);
});

it("does not postpone the task when disabled", () => {
  const props = makeProps({disabled: true});
  const {container} = render(<PostponeButton {...props} />);

  fireEvent.click(ensure(container.querySelector("#postpone")));

  expect(props.postponeTask).not.toHaveBeenCalled();
});

it("stores the postpone seconds when the select changes", () => {
  const props = makeProps();
  render(<PostponeButton {...props} />);

  fireEvent.change(screen.getByRole("combobox"), {target: {value: "1800"}});

  expect(props.storePostponeSeconds).toHaveBeenCalledWith(1800);
});

it("does not postpone the task when the select itself is clicked", () => {
  const props = makeProps();
  render(<PostponeButton {...props} />);

  fireEvent.click(screen.getByRole("combobox"));

  expect(props.postponeTask).not.toHaveBeenCalled();
});

it("shows a postponing message while the task is postponing", () => {
  const props = makeProps({task: makeTask({loadingState: "postponing"})});
  render(<PostponeButton {...props} />);

  expect(screen.getByText("Postponing...")).toBeInTheDocument();
});
