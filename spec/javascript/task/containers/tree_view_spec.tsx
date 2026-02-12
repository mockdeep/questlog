import React from "react";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";

import createAppStore from "src/create_app_store";
import TaskTreeViewContainer from "src/task/containers/tree_view";

it("wraps the TaskTreeView component", () => {
  const {container} = render(
    <Provider store={createAppStore()}><TaskTreeViewContainer /></Provider>,
  );

  expect(container.querySelector(".task-tree")).toBeInTheDocument();
});
