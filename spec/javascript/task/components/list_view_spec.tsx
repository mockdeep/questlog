vi.mock("src/task/bulk_store");

import {createRef} from "react";
import type {RefObject} from "react";
import {act, render, screen} from "@testing-library/react";

import BulkTaskStore from "src/task/bulk_store";
import type {Props} from "src/task/components/list_view";
import TaskListView from "src/task/components/list_view";

import {makeTask} from "_test_helpers/factories";

function deref(ref: RefObject<TaskListView>): TaskListView {
  if (ref.current === null) {
    throw new Error("ref.current is null");
  }
  return ref.current;
}

const props: Props = {
  currentTasks: [],
  deleteTask: vi.fn(),
  pendingTasks: [],
  updateTask: vi.fn(),
};

it("renders current tasks", () => {
  const overrides: Props = {...props, currentTasks: [makeTask()]};

  render(<TaskListView {...overrides} />);

  expect(screen.getByText("Current tasks")).toBeInTheDocument();
});

it("does not render a current tasks table when none are present", () => {
  render(<TaskListView {...props} />);

  expect(screen.queryByText("Current tasks")).not.toBeInTheDocument();
});

it("renders pending tasks", () => {
  const overrides: Props = {...props, pendingTasks: [makeTask()]};

  render(<TaskListView {...overrides} />);

  expect(screen.getByText("Pending tasks")).toBeInTheDocument();
});

it("does not render a pending tasks table when none are present", () => {
  render(<TaskListView {...props} />);

  expect(screen.queryByText("Pending tasks")).not.toBeInTheDocument();
});

it("updates task rows based on updated props", () => {
  const overrides: Props = {...props, currentTasks: [makeTask()]};

  const {rerender} = render(<TaskListView {...overrides} />);
  const updated = <TaskListView
    {...props}
    currentTasks={[]}
    pendingTasks={[makeTask()]}
    deleteTask={vi.fn()}
    updateTask={vi.fn()}
  />;
  rerender(updated);

  expect(screen.queryByText("Current tasks")).not.toBeInTheDocument();
  expect(screen.getByText("Pending tasks")).toBeInTheDocument();
});

describe("moving a task when dragging", () => {
  it("moves a task after another task", () => {
    const task1 = makeTask({title: "Task One"});
    const task2 = makeTask({title: "Task Two"});
    const overrides: Props = {...props, currentTasks: [task1, task2]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);

    const rows = screen.getAllByRole("row");
    // Verify initial order (header + 2 task rows)
    expect(rows).toHaveLength(3);

    act(() => {
      deref(ref).moveTask(task1.id, task2.id);
    });

    const updatedRows = screen.getAllByRole("row");
    expect(updatedRows).toHaveLength(3);
    // After move, task2 should come before task1
    const cells = screen.getAllByDisplayValue(/Task/u);
    expect(cells[0]).toHaveValue("Task Two");
    expect(cells[1]).toHaveValue("Task One");
  });

  it("does nothing when moving task id is the same as after task id", () => {
    const task1 = makeTask({title: "Task One"});
    const task2 = makeTask({title: "Task Two"});
    const overrides: Props = {...props, currentTasks: [task1, task2]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);

    deref(ref).moveTask(task1.id, task1.id);

    const cells = screen.getAllByDisplayValue(/Task/u);
    expect(cells[0]).toHaveValue("Task One");
    expect(cells[1]).toHaveValue("Task Two");
  });
});

describe("saving task after drop", () => {
  it("sets null task priority to match below task when moved to top", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask();
    const overrides: Props = {...props, currentTasks: [task3, task1, task2]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);
    const updatePriority = vi.fn();
    const fakeComponent = {props: {task: task3}, updatePriority};

    deref(ref).saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 2}});
  });

  it("sets task priority to match below task when moved to top", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: 3});
    const overrides: Props = {...props, currentTasks: [task3, task1, task2]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);
    const updatePriority = vi.fn();
    const fakeComponent = {props: {task: task3}, updatePriority};

    deref(ref).saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 2}});
  });

  it("sets task priority to match above task when moved to bottom", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: 3});
    const overrides: Props = {...props, currentTasks: [task2, task3, task1]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);
    const updatePriority = vi.fn();
    const fakeComponent = {props: {task: task1}, updatePriority};

    deref(ref).saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 3}});
  });

  it("sets task priority to null when above task has null priority", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask();
    const overrides: Props = {...props, currentTasks: [task2, task3, task1]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);
    const updatePriority = vi.fn();
    const fakeComponent = {props: {task: task1}, updatePriority};

    deref(ref).saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: null}});
  });

  it("keeps task priority at null when moved to bottom", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask();
    const task3 = makeTask({priority: 3});
    const overrides: Props = {...props, currentTasks: [task1, task3, task2]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);
    const updatePriority = vi.fn();
    const fakeComponent = {props: {task: task2}, updatePriority};

    deref(ref).saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: null}});
  });

  it("keeps task priority when below task matches but not above", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: 3});
    const overrides: Props = {...props, currentTasks: [task1, task3, task2]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);
    const updatePriority = vi.fn();
    const fakeComponent = {props: {task: task3}, updatePriority};

    deref(ref).saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 3}});
  });

  it("keeps task priority when above task matches but not below", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 2});
    const task3 = makeTask({priority: 3});
    const overrides: Props = {...props, currentTasks: [task2, task1, task3]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);
    const updatePriority = vi.fn();
    const fakeComponent = {props: {task: task1}, updatePriority};

    deref(ref).saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 2}});
  });

  it("sets task priority to below task priority when neither match", () => {
    const task1 = makeTask({priority: 1});
    const task2 = makeTask({priority: 2});
    const task3 = makeTask({priority: 3});
    const overrides: Props = {...props, currentTasks: [task2, task1, task3]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);
    const updatePriority = vi.fn();
    const fakeComponent = {props: {task: task1}, updatePriority};

    deref(ref).saveTaskPositions(fakeComponent);

    expect(updatePriority).toHaveBeenCalledWith({target: {value: 3}});
  });

  it("updates the tasks on the server", () => {
    const task1 = makeTask({priority: 1});
    const task2 = makeTask({priority: 2});
    const task3 = makeTask({priority: 3});
    const overrides: Props = {...props, currentTasks: [task2, task1, task3]};
    const ref = createRef<TaskListView>();
    render(<TaskListView {...overrides} ref={ref} />);
    const fakeComponent = {props: {task: task1}, updatePriority: vi.fn()};

    deref(ref).saveTaskPositions(fakeComponent);

    const expected = {positions: [task2.id, task1.id, task3.id]};
    expect(BulkTaskStore.update).toHaveBeenCalledWith(expected);
  });
});
