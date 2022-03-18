import React from 'react';

import grab from 'src/_helpers/grab';
import TagEditViewContainer from 'src/tag/containers/edit_view';
import TaskShowViewContainer from 'src/task/containers/show_view';
import TagListViewContainer from 'src/tag/containers/list_view';
import TaskFocusViewContainer from 'src/task/containers/focus_view';
import TaskListViewContainer from 'src/task/containers/list_view';
import TaskTreeViewContainer from 'src/task/containers/tree_view';
import TimeframeListViewContainer from 'src/timeframe/containers/list_view';

const ROUTE_NAME_TO_COMPONENT_MAP = {
  root: TaskFocusViewContainer,
  showTask: TaskShowViewContainer,
  tasks: TaskListViewContainer,
  leafTasks: TaskListViewContainer,
  rootTasks: TaskListViewContainer,
  treeTasks: TaskTreeViewContainer,
  timeframes: TimeframeListViewContainer,
  tags: TagListViewContainer,
  editTag: TagEditViewContainer,
  tag: TaskFocusViewContainer,
};

type Props = {
  route: Route;
};

// eslint-disable-next-line react/prefer-stateless-function
class Router extends React.Component<Props, never> {
  render() {
    const {route} = this.props;
    const Component = grab(ROUTE_NAME_TO_COMPONENT_MAP, route.name);

    return <Component />;
  }
}

export default Router;
