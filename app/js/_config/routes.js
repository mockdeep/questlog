import React from 'react';
import {Route, IndexRoute} from 'react-router';

import TaskContainer from 'js/task/containers/item';

import AppBase from 'js/app_base';
import BulkTasksNew from 'js/task/components/bulk_new';
import PrivacyPage from 'js/static/components/privacy_page';
import WhatPage from 'js/static/components/what_page';
import SessionsNew from 'js/session/components/new';
import TaskList from 'js/task/components/list';
import TimeframeList from 'js/timeframe/components/list';

function Nothing() { return false; }

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
    <IndexRoute component={TaskContainer} />
    <Route path='/:slug' component={TaskContainer} />
  </Route>
);
