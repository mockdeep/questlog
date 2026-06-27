import {createRoot} from "react-dom/client";
import type {Root} from "react-dom/client";
import {Controller} from "@hotwired/stimulus";
import {Provider} from "react-redux";
import type {ReactElement} from "react";

import appStore from "../_common/app_store";
import {ensure} from "helpers/ensure";
import {grab} from "helpers/grab";
import TagEditView from "../tag/components/edit_view";
import TaskShowViewContainer from "../task/containers/show_view";
import TaskFocusViewContainer from "../task/containers/focus_view";
import TaskListViewContainer from "../task/containers/list_view";
import TaskTreeViewContainer from "../task/containers/tree_view";
import TimeframeListViewContainer from "../timeframe/containers/list_view";
import {fetchRoute} from "../route/action_creators";
import {fetchTasks} from "../task/action_creators";

interface MountProps {
  tag?: Tag;
}

const COMPONENTS = {
  focus: TaskFocusViewContainer,
  showTask: TaskShowViewContainer,
  tasks: TaskListViewContainer,
  timeframes: TimeframeListViewContainer,
  treeTasks: TaskTreeViewContainer,
};

class ReactController extends Controller {
  componentNameValue!: string;

  propsValue!: MountProps;

  root!: Root;

  static override values = {componentName: String, props: Object};

  override connect(): void {
    appStore.dispatch(fetchRoute());
    appStore.dispatch(fetchTasks());

    this.root = createRoot(this.element);
    this.root.render(<Provider store={appStore}>
      <div>
        {this.component()}
      </div>
    </Provider>);
  }

  override disconnect(): void {
    this.root.unmount();
  }

  private component(): ReactElement {
    if (this.componentNameValue === "editTag") {
      return <TagEditView tag={ensure(this.propsValue.tag)} />;
    }

    const Component = grab(COMPONENTS, this.componentNameValue);

    return <Component />;
  }
}

export default ReactController;
