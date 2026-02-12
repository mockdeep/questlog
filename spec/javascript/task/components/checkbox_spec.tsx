import {fireEvent, render, screen} from "@testing-library/react";

import TaskCheckbox from "src/task/components/checkbox";
import {makeTask} from "_test_helpers/factories";

const task = makeTask();
const props = {task};

it("enables the checkbox by default", () => {
  render(<TaskCheckbox {...props} />);

  expect(screen.getByRole("checkbox")).not.toBeDisabled();
});

describe("when passed a \"disabled\" prop", () => {
  it("disables the checkbox", () => {
    render(<TaskCheckbox {...props} disabled />);

    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("does not add an \"enabled\" class", () => {
    const {container} = render(<TaskCheckbox {...props} disabled />);

    const label = container.querySelector("label");
    const cls = "task-item__checkbox-display--enabled";
    expect(label).not.toHaveClass(cls);
  });
});

it("passes an onChange callback through to the checkbox", () => {
  const onChange = vi.fn();
  render(<TaskCheckbox {...props} onChange={onChange} />);

  fireEvent.click(screen.getByRole("checkbox"));

  expect(onChange).toHaveBeenCalled();
});

it("adds a \"checked\" class to the label when checked", () => {
  const el = <TaskCheckbox {...props} checked onChange={vi.fn()} />;
  const {container} = render(el);
  const label = container.querySelector("label");
  const cls = "task-item__checkbox-display--checked";

  expect(label).toHaveClass(cls);
});

it("adds an \"enabled\" class to the label when not disabled", () => {
  const {container} = render(<TaskCheckbox {...props} />);

  const label = container.querySelector("label");
  const cls = "task-item__checkbox-display--enabled";

  expect(label).toHaveClass(cls);
});
