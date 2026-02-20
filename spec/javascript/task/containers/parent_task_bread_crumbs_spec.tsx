import {createStore} from "redux";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";

import ParentTaskBreadCrumbsContainer, {ParentTaskBreadCrumbs}
  from "javascript/task/containers/parent_task_bread_crumbs";

import {makeState, makeTask} from "_test_helpers/factories";

describe("ParentTaskBreadCrumbs", () => {
  it("renders nothing when there is no task", () => {
    const {container} = render(<ParentTaskBreadCrumbs />);

    expect(container.firstChild).toBeNull();
  });

  it("renders a link to the task when present", () => {
    const task = makeTask({title: "some task"});
    const state = makeState({task: [task]});
    const store = createStore(() => state);

    render(<Provider store={store}>
      <ParentTaskBreadCrumbs task={task} />
    </Provider>);

    const link = screen.getByRole("link", {name: "some task"});
    expect(link).toHaveAttribute("href", `/tasks/${task.id}`);
  });

  it("renders a parent task link recursively when tree goes deeper", () => {
    const parentTask = makeTask({title: "parent task"});
    const childTask = makeTask({
      title: "child task",
      parentTaskId: parentTask.id,
    });
    const state = makeState({task: [parentTask, childTask]});
    const store = createStore(() => state);

    render(<Provider store={store}>
      <ParentTaskBreadCrumbs task={childTask} />
    </Provider>);

    expect(screen.getByRole("link", {name: "child task"})).toBeInTheDocument();
    expect(screen.getByRole("link", {name: "parent task"})).toBeInTheDocument();
  });
});

describe("ParentTaskBreadCrumbsContainer", () => {
  it("renders the component with a task when taskId is present", () => {
    const task = makeTask({title: "a task"});
    const state = makeState({task: [task]});
    const store = createStore(() => state);

    render(<Provider store={store}>
      <ParentTaskBreadCrumbsContainer taskId={task.id} />
    </Provider>);

    expect(screen.getByRole("link", {name: "a task"})).toBeInTheDocument();
  });
});
