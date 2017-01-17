'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import appReducer from 'js/app_reducer';

export default createStore(appReducer, applyMiddleware(thunk));
