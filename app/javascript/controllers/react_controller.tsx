import {createRoot} from "react-dom/client";
import type {Root} from "react-dom/client";
import {Controller} from "@hotwired/stimulus";
import {Provider} from "react-redux";
import type {ReactElement} from "react";

import appStore from "../_common/app_store";
import {grab} from "helpers/grab";
import TaskShowViewContainer from "../task/containers/show_view";
import TaskFocusViewContainer from "../task/containers/focus_view";
import TaskListViewContainer from "../task/containers/list_view";
import {setRoute} from "../route/action_creators";
import {setTags} from "../tag/action_creators";
import {setTasks, updateTaskMeta} from "../task/action_creators";

const COMPONENTS = {
  focus: TaskFocusViewContainer,
  showTask: TaskShowViewContainer,
  tasks: TaskListViewContainer,
};

class ReactController extends Controller {
  componentNameValue!: string;

  routeValue!: Partial<RouteState>;

  tagsValue!: Tag[];

  tasksValue!: UnprocessedTask[];

  root!: Root;

  static override values = {
    componentName: String,
    route: Object,
    tags: Array,
    tasks: Array,
  };

  override connect(): void {
    appStore.dispatch(setRoute(this.routeValue));
    appStore.dispatch(setTasks(this.tasksValue));
    appStore.dispatch(setTags(this.tagsValue));
    appStore.dispatch(updateTaskMeta({ajaxState: "ready"}));

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
    const Component = grab(COMPONENTS, this.componentNameValue);

    return <Component />;
  }
}

export default ReactController;
