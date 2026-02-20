import {createStore} from "redux";
import {Provider} from "react-redux";
import {render, screen} from "@testing-library/react";

import TaskShowViewContainer from "javascript/task/containers/show_view";

import {makeState, makeTask} from "_test_helpers/factories";

it("wraps the TaskShowView component", () => {
  const task = makeTask();
  const state = makeState({route: {params: {taskId: task.id}}, task: [task]});
  const store = createStore(() => state);
  render(
    <Provider store={store}><TaskShowViewContainer /></Provider>,
  );

  expect(screen.getByDisplayValue(task.title)).toBeInTheDocument();
});
