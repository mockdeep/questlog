import {createRef} from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";

import {ensure} from "helpers/ensure";
import TaskTitle from "javascript/task/components/task_title";
import createAppStore from "javascript/_common/create_app_store";

import {makeTask} from "support/factories";

const deleteTask = vi.fn();

function renderTitle(task: Task): ReturnType<typeof render> {
  const titleProps = {deleteTask, task};

  return render(<Provider store={createAppStore()}>
    <TaskTitle {...titleProps} />
  </Provider>);
}

it("renders an editable title form", () => {
  const task = makeTask();
  renderTitle(task);

  expect(screen.getByDisplayValue(task.title)).toBeInTheDocument();
});

it("adds a priority class for a prioritized task", () => {
  const {container} = renderTitle(makeTask({priority: 2}));

  expect(container.querySelector("#task")).toHaveClass("priority-2");
});

it("adds an over-skipped class when the skip count is high", () => {
  const {container} = renderTitle(makeTask({skipCount: 15}));

  expect(container.querySelector("#task")).toHaveClass("over-skipped");
});

it("renders a repeat emblem for a repeating task", () => {
  const {container} = renderTitle(makeTask({repeatSeconds: 86400}));

  expect(container.querySelector("i.fa-redo-alt")).toBeInTheDocument();
});

it("renders the timeframe name when the task has a timeframe", () => {
  renderTitle(makeTask({timeframe: "today"}));

  expect(screen.getByText("Today")).toBeInTheDocument();
});

it("title returns the skip count", () => {
  const ref = createRef<TaskTitle>();
  const titleProps = {deleteTask, ref, task: makeTask({skipCount: 7})};
  render(<Provider store={createAppStore()}>
    <TaskTitle {...titleProps} />
  </Provider>);

  expect(ensure(ref.current).title()).toBe("skip count: 7");
});
