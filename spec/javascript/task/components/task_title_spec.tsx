import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";

import TaskTitle from "javascript/task/components/task_title";
import createAppStore from "javascript/_common/create_app_store";

import {makeTask} from "support/factories";

const task = makeTask();
const props = {deleteTask: vi.fn(), task};

it("renders an editable title form", () => {
  render(<Provider store={createAppStore()}>
    <TaskTitle {...props} />
  </Provider>);

  expect(screen.getByDisplayValue(task.title)).toBeInTheDocument();
});
