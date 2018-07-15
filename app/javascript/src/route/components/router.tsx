import React from 'react';

import grab from 'src/_helpers/grab';
import TaskBulkAddViewContainer from 'src/task/containers/bulk_add_view';
import PrivacyView from 'src/static/components/privacy_view';
import SessionNewView from 'src/session/components/new_view';
import TagEditViewContainer from 'src/tag/containers/edit_view';
import TaskShowViewContainer from 'src/task/containers/show_view';
import TagListViewContainer from 'src/tag/containers/list_view';
import TaskFocusViewContainer from 'src/task/containers/focus_view';
import TaskListViewContainer from 'src/task/containers/list_view';
import TaskTreeViewContainer from 'src/task/containers/tree_view';
import TimeframeListViewContainer from 'src/timeframe/containers/list_view';
import WhatView from 'src/static/components/what_view';
import {routeShape} from 'src/shapes';

function Nothing() { return null; }

const ROUTE_NAME_TO_COMPONENT_MAP = {
  root: TaskFocusViewContainer,
  bulkTaskNew: TaskBulkAddViewContainer,
  freeAccountsNew: Nothing,
  sessionsNew: SessionNewView,
  sessions: Nothing,
  showTask: TaskShowViewContainer,
  tasks: TaskListViewContainer,
  privacy: PrivacyView,
  leafTasks: TaskListViewContainer,
  rootTasks: TaskListViewContainer,
  treeTasks: TaskTreeViewContainer,
  what: WhatView,
  timeframes: TimeframeListViewContainer,
  tags: TagListViewContainer,
  editTag: TagEditViewContainer,
  tag: TaskFocusViewContainer,
};

function Router({route}) {
  const Component = grab(ROUTE_NAME_TO_COMPONENT_MAP, route.name);

  return <Component />;
}

Router.propTypes = {route: routeShape.isRequired};

export default Router;
