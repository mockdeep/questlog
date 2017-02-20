import React from 'react';
import {Route, IndexRoute} from 'react-router';

import TaskConnector from 'js/task/connectors/item';

import AppBase from 'js/app_base';
import BulkTasksNew from 'js/task/containers/bulk_new';
import PrivacyPage from 'js/static/containers/privacy_page';
import WhatPage from 'js/static/containers/what_page';
import SessionsNew from 'js/session/containers/new';
import TaskList from 'js/task/containers/list';
import TimeframeList from 'js/timeframe/containers/list';

const Nothing = React.createClass({render() { return false; }});

export default ( // eslint-disable-line no-extra-parens
  <Route path='/' component={AppBase}>
    <Route path='/bulk_tasks/new' component={BulkTasksNew} />
    <Route path='/free_accounts/new' component={Nothing} />
    <Route path='/sessions/new' component={SessionsNew} />
    <Route path='/sessions' component={Nothing} />
    <Route path='/tasks' component={TaskList} />
    <Route path='/privacy' component={PrivacyPage} />
    <Route path='/what' component={WhatPage} />
    <Route path='/timeframes' component={TimeframeList} />
    <IndexRoute component={TaskConnector} />
    <Route path='/:slug' component={TaskConnector} />
  </Route>
);
