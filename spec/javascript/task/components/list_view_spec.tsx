import {createRef} from "react";
import type {RefObject} from "react";
import {act, render, screen} from "@testing-library/react";

import type {Props} from "javascript/task/components/list_view";
import TaskListView from "javascript/task/components/list_view";

import {makeTask} from "support/factories";

function deref(ref: RefObject<TaskListView | null>): TaskListView {
  if (ref.current === null) {
    throw new Error("ref.current is null");
  }
  return ref.current;
}

const moveTask = vi.fn();

const props: Props = {
  currentTasks: [],
  deleteTask: vi.fn(),
  moveTask,
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

it("renders current tasks as draggable rows", () => {
  const overrides: Props = {...props, currentTasks: [makeTask()]};

  render(<TaskListView {...overrides} />);

  const [, taskRow] = screen.getAllByRole("row");
  expect(taskRow).toHaveAttribute("draggable", "true");
});

it("renders pending tasks as non-draggable rows", () => {
  const overrides: Props = {...props, pendingTasks: [makeTask()]};

  render(<TaskListView {...overrides} />);

  const [, taskRow] = screen.getAllByRole("row");
  expect(taskRow).not.toHaveAttribute("draggable", "true");
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
    moveTask={vi.fn()}
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
      deref(ref).reorderTasks(task1.id, task2.id);
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

    deref(ref).reorderTasks(task1.id, task1.id);

    const cells = screen.getAllByDisplayValue(/Task/u);
    expect(cells[0]).toHaveValue("Task One");
    expect(cells[1]).toHaveValue("Task Two");
  });
});

describe("saving task after drop", () => {
  function dropTask(currentTasks: Task[], taskId: number): void {
    const ref = createRef<TaskListView>();

    render(<TaskListView {...props} currentTasks={currentTasks} ref={ref} />);
    deref(ref).saveTaskPositions(taskId);
  }

  it("sets null task priority to match below task when moved to top", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask();
    dropTask([task3, task1, task2], task3.id);

    expect(moveTask).toHaveBeenCalledWith(
      task3.id,
      expect.objectContaining({priority: 2}),
    );
  });

  it("sets task priority to match below task when moved to top", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: 3});
    dropTask([task3, task1, task2], task3.id);

    expect(moveTask).toHaveBeenCalledWith(
      task3.id,
      expect.objectContaining({priority: 2}),
    );
  });

  it("sets task priority to match above task when moved to bottom", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: 3});
    dropTask([task2, task3, task1], task1.id);

    expect(moveTask).toHaveBeenCalledWith(
      task1.id,
      expect.objectContaining({priority: 3}),
    );
  });

  it("sets task priority to null when above task has null priority", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask();
    dropTask([task2, task3, task1], task1.id);

    expect(moveTask).toHaveBeenCalledWith(
      task1.id,
      expect.objectContaining({priority: null}),
    );
  });

  it("keeps task priority at null when moved to bottom", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask();
    const task3 = makeTask({priority: 3});
    dropTask([task1, task3, task2], task2.id);

    expect(moveTask).toHaveBeenCalledWith(
      task2.id,
      expect.objectContaining({priority: null}),
    );
  });

  it("keeps task priority when below task matches but not above", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 3});
    const task3 = makeTask({priority: 3});
    dropTask([task1, task3, task2], task3.id);

    expect(moveTask).toHaveBeenCalledWith(
      task3.id,
      expect.objectContaining({priority: 3}),
    );
  });

  it("keeps task priority when above task matches but not below", () => {
    const task1 = makeTask({priority: 2});
    const task2 = makeTask({priority: 2});
    const task3 = makeTask({priority: 3});
    dropTask([task2, task1, task3], task1.id);

    expect(moveTask).toHaveBeenCalledWith(
      task1.id,
      expect.objectContaining({priority: 2}),
    );
  });

  it("sets task priority to below task priority when neither match", () => {
    const task1 = makeTask({priority: 1});
    const task2 = makeTask({priority: 2});
    const task3 = makeTask({priority: 3});
    dropTask([task2, task1, task3], task1.id);

    expect(moveTask).toHaveBeenCalledWith(
      task1.id,
      expect.objectContaining({priority: 3}),
    );
  });

  it("takes the position of the task it displaced when moved down", () => {
    const task1 = makeTask();
    const task2 = makeTask();
    const task3 = makeTask();
    dropTask([task2, task3, task1], task1.id);

    expect(moveTask).toHaveBeenCalledWith(
      task1.id,
      expect.objectContaining({position: task3.position}),
    );
  });

  it("takes the position of the task it displaced when moved up", () => {
    const task1 = makeTask();
    const task2 = makeTask();
    const task3 = makeTask();
    dropTask([task3, task1, task2], task3.id);

    expect(moveTask).toHaveBeenCalledWith(
      task3.id,
      expect.objectContaining({position: task1.position}),
    );
  });

  it("keeps its position when it has not moved", () => {
    const task1 = makeTask();
    const task2 = makeTask();
    dropTask([task1, task2], task1.id);

    expect(moveTask).toHaveBeenCalledWith(
      task1.id,
      expect.objectContaining({position: task1.position}),
    );
  });
});
