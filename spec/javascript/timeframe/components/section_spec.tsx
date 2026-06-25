import type {ComponentProps} from "react";
import {render, screen} from "@testing-library/react";
import {expect, it, vi} from "vitest";

import type {UpdateTask} from "javascript/task/action_creators";
import TimeframeSection from "javascript/timeframe/components/section";

import {makeTask, makeTimeframe} from "support/factories";

type Props = ComponentProps<typeof TimeframeSection>;

function makeProps(overrides: Partial<Props> = {}): Props {
  return {
    deleteTask: vi.fn<(taskId: number) => void>(),
    timeframe: makeTimeframe(),
    timeframeSpace: {},
    updateTask: vi.fn<UpdateTask>(),
    ...overrides,
  };
}

it("renders the timeframe name as a heading", () => {
  render(<TimeframeSection {...makeProps()} />);

  expect(screen.getByRole("heading")).toHaveTextContent("Inbox");
});

it("uses the inbox class for the inbox timeframe", () => {
  const timeframe = makeTimeframe({name: "inbox"});
  const {container} = render(<TimeframeSection {...makeProps({timeframe})} />);

  expect(container.querySelector("#inbox")).toHaveClass("inbox");
});

it("uses the timeframe class for other timeframes", () => {
  const timeframe = makeTimeframe({name: "today"});
  const {container} = render(<TimeframeSection {...makeProps({timeframe})} />);

  expect(container.querySelector("#today")).toHaveClass("timeframe");
});

it("renders an infinite max when the timeframe is unbounded", () => {
  const {container} = render(<TimeframeSection {...makeProps()} />);

  expect(screen.getByRole("heading")).toHaveTextContent("0/∞");
  expect(container.querySelector("span.danger")).not.toBeInTheDocument();
});

it("flags the section as over the limit when the total exceeds the max", () => {
  const timeframe = makeTimeframe({currentTasks: [makeTask()], minuteMax: 10});
  const {container} = render(<TimeframeSection {...makeProps({timeframe})} />);

  expect(screen.getByRole("heading")).toHaveTextContent("30/10");
  expect(container.querySelector("span.danger")).toBeInTheDocument();
});

it("renders a row for each current task", () => {
  const task = makeTask({title: "a current task"});
  const timeframe = makeTimeframe({currentTasks: [task]});
  render(<TimeframeSection {...makeProps({timeframe})} />);

  expect(screen.getByDisplayValue("a current task")).toBeInTheDocument();
});

it("renders a pending row for each pending task", () => {
  const task = makeTask({pending: true});
  const timeframe = makeTimeframe({pendingTasks: [task]});
  render(<TimeframeSection {...makeProps({timeframe})} />);

  expect(screen.getByRole("button", {name: "UNDO"})).toBeInTheDocument();
});

it("renders no task rows when the timeframe is empty", () => {
  render(<TimeframeSection {...makeProps()} />);

  expect(screen.queryByRole("button", {name: "DONE"})).not.toBeInTheDocument();
});
