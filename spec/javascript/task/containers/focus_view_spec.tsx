import React from "react";
import {Provider} from "react-redux";
import {mount} from "enzyme";

import TaskFocusViewContainer from "src/task/containers/focus_view";
import createAppStore from "src/create_app_store";

it("wraps the Item component", () => {
  const container = mount(
    <Provider store={createAppStore()}><TaskFocusViewContainer /></Provider>,
  );

  expect(container.find("TaskFocusView")).toExist();
});
