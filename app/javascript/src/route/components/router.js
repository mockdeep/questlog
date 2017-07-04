import React from 'react';
import {Route, Switch} from 'react-router-dom';

import BulkTasksNew from 'src/task/components/bulk_new';
import PrivacyPage from 'src/static/components/privacy_page';
import SessionsNew from 'src/session/components/new';
import TaskContainer from 'src/task/containers/item';
import TaskList from 'src/task/containers/list';
import TimeframeList from 'src/timeframe/containers/list';
import WhatPage from 'src/static/components/what_page';

function Nothing() { return false; }

export default ( // eslint-disable-line no-extra-parens
  <Switch>
    <Route exact path='/' component={TaskContainer} />
    <Route path='/bulk_tasks/new' component={BulkTasksNew} />
    <Route path='/free_accounts/new' component={Nothing} />
    <Route path='/sessions/new' component={SessionsNew} />
    <Route path='/sessions' component={Nothing} />
    <Route path='/tasks' component={TaskList} />
    <Route path='/privacy' component={PrivacyPage} />
    <Route path='/what' component={WhatPage} />
    <Route path='/timeframes' component={TimeframeList} />
    <Route path='/:slug' component={TaskContainer} />
  </Switch>
);
