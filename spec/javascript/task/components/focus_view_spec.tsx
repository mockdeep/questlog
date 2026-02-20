vi.mock("helpers/request", () => {
  const fakePromise: {then: Mock} = {then: vi.fn(() => fakePromise)};

  return {request: () => fakePromise};
});

import type {Mock} from "vitest";

import type {ReactElement} from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";

import type {Props} from "javascript/task/components/focus_view";
import TaskFocusView from "javascript/task/components/focus_view";
import createAppStore from "javascript/_common/create_app_store";

import {makeTask} from "_test_helpers/factories";

const updateTask = vi.fn();
const props: Props = {
  ajaxState: "ready",
  deleteTask: vi.fn(),
  updateTask,
};

function noop(): void {
  // Intentionally empty
}

function renderWithStore(ui: ReactElement) {
  return render(<Provider store={createAppStore()}>{ui}</Provider>);
}

it("updates the task on postpone", () => {
  const task = makeTask();
  renderWithStore(<TaskFocusView {...props} task={task} />);

  // Change the postpone select to 1 hour (3600 seconds)
  const postponeSelect = screen.getByRole("combobox");
  fireEvent.change(postponeSelect, {target: {value: "3600"}});

  // Click the postpone div to trigger postponeTask
  fireEvent.click(screen.getByText("Postpone for:"));

  expect(updateTask).toHaveBeenCalledWith(task.id, {postpone: 3600});
});

it("updates the task on completion", () => {
  const task = makeTask();
  renderWithStore(<TaskFocusView {...props} task={task} />);

  fireEvent.click(screen.getByDisplayValue("Done! Give me another!"));

  expect(updateTask).toHaveBeenCalledWith(task.id, {done: true});
});

describe("when a task is given", () => {
  it("sets the document title to the task title", () => {
    const task = makeTask({title: "some task title"});

    renderWithStore(<TaskFocusView {...props} task={task} />);

    expect(document.title).toBe("some task title");
  });
});

describe("when no task is given and ajaxState is pending", () => {
  it("sets the document title to \"Loading...\"", () => {
    renderWithStore(<TaskFocusView {...props} ajaxState="fetching" />);

    expect(document.title).toBe("Loading...");
  });

  it("renders a loading message", () => {
    renderWithStore(<TaskFocusView {...props} ajaxState="fetching" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

describe("when no task is given and ajaxState is ready", () => {
  it("sets the document title to \"(no tasks!)\"", () => {
    renderWithStore(<TaskFocusView {...props} />);

    expect(document.title).toBe("(no tasks!)");
  });

  it("renders a no tasks message", () => {
    renderWithStore(<TaskFocusView {...props} />);

    expect(screen.getByText(/No tasks/u)).toBeInTheDocument();
  });
});

it("throws an error when ajaxState is not accounted for", () => {
  vi.spyOn(console, "error").mockImplementation(noop);
  vi.spyOn(process.stderr, "write").mockReturnValue(true);
  expect(() => {
    renderWithStore(<TaskFocusView {...props} ajaxState="froggling" />);
  }).toThrow(/don't know how to deal with ajaxState "froggling"/u);
});
