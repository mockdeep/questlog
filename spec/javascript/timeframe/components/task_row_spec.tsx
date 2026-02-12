import {render, screen} from "@testing-library/react";

import {makeTask} from "_test_helpers/factories";

import type {Props} from "src/timeframe/components/task_row";
import TaskRow from "src/timeframe/components/task_row";

const props: Props = {
  deleteTask: vi.fn(),
  updateTask: vi.fn(),
  task: makeTask(),
  timeframeSpace: {},
};

it("renders a table row", () => {
  const el = <table><tbody><TaskRow {...props} /></tbody></table>;
  const {container} = render(el);

  expect(container.querySelector("tr")).toHaveClass("tasks-table__row");
});

it("renders the timeframe selector", () => {
  const el = <table><tbody><TaskRow {...props} /></tbody></table>;
  const {container} = render(el);

  const select = container.querySelector("select.timeframe-select");
  expect(select).toBeInTheDocument();
});

it("renders an undo button when task is pending", () => {
  const task = makeTask({pending: true});
  render(<table><tbody><TaskRow {...props} task={task} /></tbody></table>);

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(3);
  expect(screen.getByRole("button", {name: "UNDO"})).toBeInTheDocument();
});

it("does not render an undo button when task is not pending", () => {
  const task = makeTask({pending: false});
  render(<table><tbody><TaskRow {...props} task={task} /></tbody></table>);

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(2);
  expect(screen.getByRole("button", {name: "DONE"})).toBeInTheDocument();
  expect(screen.getByRole("button", {name: "DELETE"})).toBeInTheDocument();
});
