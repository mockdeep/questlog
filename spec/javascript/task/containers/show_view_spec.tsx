import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {mount} from "enzyme";

import TaskShowViewContainer from "src/task/containers/show_view";

import {makeState, makeTask} from "_test_helpers/factories";

it("wraps the TaskShowView component", () => {
  const task = makeTask();
  const state = makeState({route: {params: {taskId: task.id}}, task: [task]});
  const store = createStore(() => state);
  const container = mount(
    <Provider store={store}><TaskShowViewContainer /></Provider>,
  );

  expect(container.find("TaskShowView")).toExist();
});
