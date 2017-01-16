'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import createMergedReducer from 'js/_common/merged_reducer';

const reducer = createMergedReducer({});

export default createStore(reducer, applyMiddleware(thunk));
