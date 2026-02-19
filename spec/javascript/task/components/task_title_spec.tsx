import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";

import TaskTitle from "src/task/components/task_title";
import createAppStore from "src/_common/create_app_store";

import {makeTask} from "_test_helpers/factories";

const task = makeTask();
const props = {deleteTask: vi.fn(), task};

it("renders an editable title form", () => {
  render(<Provider store={createAppStore()}>
    <TaskTitle {...props} />
  </Provider>);

  expect(screen.getByDisplayValue(task.title)).toBeInTheDocument();
});
