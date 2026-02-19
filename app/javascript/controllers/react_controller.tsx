import {createRoot} from "react-dom/client";
import type {Root} from "react-dom/client";
import {Controller} from "@hotwired/stimulus";
import {Provider} from "react-redux";

import appStore from "src/_common/app_store";
import {grab} from "helpers";
import TagEditViewContainer from "src/tag/containers/edit_view";
import TaskShowViewContainer from "src/task/containers/show_view";
import TaskFocusViewContainer from "src/task/containers/focus_view";
import TaskListViewContainer from "src/task/containers/list_view";
import TaskTreeViewContainer from "src/task/containers/tree_view";
import TimeframeListViewContainer from "src/timeframe/containers/list_view";
import {fetchRoute} from "src/route/action_creators";
import {fetchTasks} from "src/task/action_creators";

const COMPONENTS = {
  editTag: TagEditViewContainer,
  focus: TaskFocusViewContainer,
  showTask: TaskShowViewContainer,
  tasks: TaskListViewContainer,
  timeframes: TimeframeListViewContainer,
  treeTasks: TaskTreeViewContainer,
};

class ReactController extends Controller {
  componentNameValue!: string;

  root!: Root;

  static override values = {componentName: String};

  override connect(): void {
    appStore.dispatch(fetchRoute());
    appStore.dispatch(fetchTasks());

    const Component = grab(COMPONENTS, this.componentNameValue);

    this.root = createRoot(this.element);
    this.root.render(<Provider store={appStore}>
      <div>
        <Component />
      </div>
    </Provider>);
  }

  override disconnect(): void {
    this.root.unmount();
  }
}

export default ReactController;
