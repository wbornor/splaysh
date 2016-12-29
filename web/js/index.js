'use strict';

import 'babel-polyfill';
import {render} from "react-dom";
import React from "react";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from "./components/app";

process.env.NODE_ENV = 'production';
console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("BABEL_ENV: " + process.env.BABEL_ENV);
const logger = createLogger();
const store = createStore(allReducers,
    applyMiddleware(thunk, promise, logger)
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
