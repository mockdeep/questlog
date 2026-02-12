import {render} from "@testing-library/react";
import {Provider} from "react-redux";

import TaskDisplay from "src/task/components/task_display";
import createAppStore from "src/create_app_store";

import {makeTask} from "_test_helpers/factories";

const task = makeTask({tagIds: [1]});
const props = {
  completeTask: vi.fn(),
  deleteTask: vi.fn(),
  disabled: false,
  postponeTask: vi.fn(),
  storePostponeSeconds: vi.fn(),
  task,
  updateTask: vi.fn(),
};

it("renders TagButtons", () => {
  const {container} = render(<Provider store={createAppStore()}>
    <TaskDisplay {...props} />
  </Provider>);

  expect(container.querySelector(".tag-buttons")).toBeInTheDocument();
});
