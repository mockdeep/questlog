import React from 'react';
import ReactDOM from 'react-dom';
import {Controller} from '@hotwired/stimulus';
import {Provider} from 'react-redux';

import appStore from 'src/app_store';
import {grab} from 'helpers';
import TagEditViewContainer from 'src/tag/containers/edit_view';
import TaskShowViewContainer from 'src/task/containers/show_view';
import TaskFocusViewContainer from 'src/task/containers/focus_view';
import TaskListViewContainer from 'src/task/containers/list_view';
import TaskTreeViewContainer from 'src/task/containers/tree_view';
import TimeframeListViewContainer from 'src/timeframe/containers/list_view';
import {fetchRoute} from 'src/route/action_creators';
import {fetchTasks} from 'src/task/action_creators';

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

  static values = {componentName: String};

  connect(): void {
    appStore.dispatch(fetchRoute());
    appStore.dispatch(fetchTasks());

    const Component = grab(COMPONENTS, this.componentNameValue);

    ReactDOM.render(
      <Provider store={appStore}>
        <div>
          <Component />
        </div>
      </Provider>,
      this.element,
    );
  }
}

export default ReactController;
