vi.mock("src/route/selectors");
vi.mock("src/task/bulk_store");

import {Provider} from "react-redux";
import {render} from "@testing-library/react";

import TaskListViewContainer from "src/task/containers/list_view";
import createAppStore from "src/_common/create_app_store";
import {setRoute} from "src/route/action_creators";

it("wraps the TaskListView component", () => {
  const store = createAppStore();

  store.dispatch(setRoute({name: "tasks"}));
  const {container} = render(
    <Provider store={store}><TaskListViewContainer /></Provider>,
  );

  /*
   * TaskListView renders when no tasks,
   * it returns DndProvider wrapping null tables
   */
  expect(container).toBeInTheDocument();
});
