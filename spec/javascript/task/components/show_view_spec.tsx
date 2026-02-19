import type {ReactElement} from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";

import type {Props} from "src/task/components/show_view";
import TaskShowView from "src/task/components/show_view";
import createAppStore from "src/_common/create_app_store";

import {makeTask} from "_test_helpers/factories";

const props: Props = {
  deleteTask: vi.fn(),
  updateTask: vi.fn(),
  task: makeTask(),
  subTasks: [],
};

function renderWithStore(ui: ReactElement): ReturnType<typeof render> {
  return render(<Provider store={createAppStore()}>{ui}</Provider>);
}

it("renders something when the task is present", () => {
  const task = makeTask({title: "foo title"});

  const {container} = renderWithStore(<TaskShowView {...props} task={task} />);

  expect(container.querySelector("section")).not.toBeNull();
});

it("renders the task title", () => {
  const task = makeTask({title: "foo title"});

  renderWithStore(<TaskShowView {...props} task={task} />);

  expect(screen.getByDisplayValue("foo title")).toBeInTheDocument();
});

it("renders a message about the repeat time when present", () => {
  const task = makeTask({title: "foo title", repeatSeconds: 3600});

  renderWithStore(<TaskShowView {...props} task={task} />);

  expect(screen.getByText("Repeat: every 1 hour")).toBeInTheDocument();
});

it("renders a message about no repeat time when not present", () => {
  const task = makeTask({title: "foo title"});

  renderWithStore(<TaskShowView {...props} task={task} />);

  expect(screen.getByText("Repeat: never")).toBeInTheDocument();
});

it("renders a message about the estimate when present", () => {
  const task = makeTask({title: "foo title", estimateSeconds: 5200});

  renderWithStore(<TaskShowView {...props} task={task} />);

  expect(screen.getByText("Estimate: 1 hour, 26 minutes")).toBeInTheDocument();
});

it("renders a message about no estimate when not present", () => {
  const task = makeTask({title: "foo title"});

  renderWithStore(<TaskShowView {...props} task={task} />);

  expect(screen.getByText("Estimate: none")).toBeInTheDocument();
});

it("renders a message about the priority when present", () => {
  const task = makeTask({title: "foo title", priority: 3});

  renderWithStore(<TaskShowView {...props} task={task} />);

  expect(screen.getByText("Priority: 3")).toBeInTheDocument();
});

it("renders a message about no priority when not present", () => {
  const task = makeTask({title: "foo title"});

  renderWithStore(<TaskShowView {...props} task={task} />);

  expect(screen.getByText("Priority: none")).toBeInTheDocument();
});

it("renders a message about associated tags when present", () => {
  const task = makeTask({title: "foo title", tagNames: ["foo", "bar", "butz"]});

  renderWithStore(<TaskShowView {...props} task={task} />);

  expect(screen.getByText("Tags: foo, bar, butz")).toBeInTheDocument();
});

it("renders a message about no tags when not present", () => {
  const task = makeTask({title: "foo title"});

  renderWithStore(<TaskShowView {...props} task={task} />);

  expect(screen.getByText("Tags: none")).toBeInTheDocument();
});
