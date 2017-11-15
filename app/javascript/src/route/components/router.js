import PropTypes from 'prop-types';
import React from 'react';

import TaskBulkAddViewContainer from 'src/task/containers/bulk_add_view';
import PrivacyView from 'src/static/components/privacy_view';
import SessionNewView from 'src/session/components/new_view';
import TagEditViewContainer from 'src/tag/containers/edit_view';
import TaskShowViewContainer from 'src/task/containers/show_view';
import TagListViewContainer from 'src/tag/containers/list_view';
import TaskFocusViewContainer from 'src/task/containers/focus_view';
import TaskListViewContainer from 'src/task/containers/list_view';
import TimeframeListViewContainer from 'src/timeframe/containers/list_view';
import WhatView from 'src/static/components/what_view';

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
  what: WhatView,
  timeframes: TimeframeListViewContainer,
  tags: TagListViewContainer,
  editTag: TagEditViewContainer,
  tag: TaskFocusViewContainer,
};

function Router(props) {
  const Component = ROUTE_NAME_TO_COMPONENT_MAP[props.route.name];

  return <Component />;
}

Router.propTypes = {route: PropTypes.object.isRequired};

export default Router;
