import type {Mock} from "vitest";

import TimeframeStore from "javascript/timeframe/store";

vi.mock("javascript/timeframe/store", () => {
  return {
    "default": {
      getAll: vi.fn(),
      subscribe: vi.fn(),
    },
  };
});

import {render, screen, waitFor} from "@testing-library/react";

import TimeframeListView from "javascript/timeframe/components/list_view";

import {makeTask, makeTimeframe} from "support/factories";

function noop(): void {
  // Never resolves
}

const props = {
  deleteTask: vi.fn(),
  fetchTasks: vi.fn(),
  updateTask: vi.fn(),
};

it("renders a loading message before content has been loaded", () => {
  (TimeframeStore.getAll as Mock).mockReturnValue(new Promise(noop));

  render(<TimeframeListView {...props} />);

  expect(screen.getByText("Loading Timeframes...")).toBeInTheDocument();
});

it("renders the current median productivity when loaded", async () => {
  const input: TimeframeData =
    {timeframes: [], meta: {medianProductivity: 4456}};

  (TimeframeStore.getAll as Mock).mockResolvedValue(input);

  render(<TimeframeListView {...props} />);

  const expectedMessage = "Median Productivity: 1 hour, 14 minutes per day";

  await waitFor(() => {
    expect(screen.getByText(expectedMessage)).toBeInTheDocument();
  });
});

it("renders the given timeframes for the user", async () => {
  const timeframe: Timeframe = makeTimeframe({
    name: "inbox",
    currentTasks: [makeTask({title: "do laundry"})],
    pendingTasks: [],
  });
  const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

  (TimeframeStore.getAll as Mock).mockResolvedValue(input);

  render(<TimeframeListView {...props} />);

  await waitFor(() => {
    expect(screen.getByText("do laundry")).toBeInTheDocument();
  });
});

it("does not render empty timeframes", async () => {
  const timeframe = makeTimeframe();
  const input = {timeframes: [timeframe], meta: {medianProductivity: 300}};

  (TimeframeStore.getAll as Mock).mockResolvedValue(input);

  render(<TimeframeListView {...props} />);

  await waitFor(() => {
    expect(screen.getByText(/Median Productivity/u)).toBeInTheDocument();
  });

  // No timeframe section should be rendered for empty timeframes
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
});
