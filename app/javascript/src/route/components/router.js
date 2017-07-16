import PropTypes from 'prop-types';
import React from 'react';

import BulkTasksNewContainer from 'src/task/containers/bulk_new';
import PrivacyPage from 'src/static/components/privacy_page';
import NewSessionForm from 'src/session/components/new_form';
import EditTagFormContainer from 'src/tag/containers/edit_form';
import TagListContainer from 'src/tag/containers/list';
import TaskContainer from 'src/task/containers/item';
import TaskList from 'src/task/containers/list';
import TimeframeList from 'src/timeframe/containers/list';
import WhatPage from 'src/static/components/what_page';

function Nothing() { return false; }

const ROUTE_NAME_TO_COMPONENT_MAP = {
  root: TaskContainer,
  bulkTaskNew: BulkTasksNewContainer,
  freeAccountsNew: Nothing,
  sessionsNew: NewSessionForm,
  sessions: Nothing,
  tasks: TaskList,
  privacy: PrivacyPage,
  what: WhatPage,
  timeframes: TimeframeList,
  tags: TagListContainer,
  editTag: EditTagFormContainer,
  tag: TaskContainer,
};

function Router(props) {
  const Component = ROUTE_NAME_TO_COMPONENT_MAP[props.route.name];

  return <Component />;
}

Router.propTypes = {route: PropTypes.object.isRequired};

export default Router;
