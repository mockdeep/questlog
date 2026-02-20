import {Provider} from "react-redux";
import {render} from "@testing-library/react";

import createAppStore from "javascript/_common/create_app_store";
import TaskTreeViewContainer from "javascript/task/containers/tree_view";

it("wraps the TaskTreeView component", () => {
  const {container} = render(
    <Provider store={createAppStore()}><TaskTreeViewContainer /></Provider>,
  );

  expect(container.querySelector(".task-tree")).toBeInTheDocument();
});
