'use strict';

import {combineReducers} from 'redux';
import ActiveNut from './reducer-active-nut';
import ActiveItem from './reducer-active-item';
import EntityReducer from './reducer-entities'

const allReducers = combineReducers({
    entities: EntityReducer,
    activeNut: ActiveNut,
    activeItem: ActiveItem,
});

export default allReducers