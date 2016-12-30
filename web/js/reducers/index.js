'use strict';

import {combineReducers} from 'redux';
import ItemsByNutReducer from './reducer-items-by-nut';
import ActiveNut from './reducer-active-nut';
import ActiveItem from './reducer-active-item';
import EntityReducer from './reducer-entities'

const allReducers = combineReducers({
   entities: EntityReducer,
    itemsByNut: ItemsByNutReducer,
    activeNut: ActiveNut,
    activeItem: ActiveItem,
});

export default allReducers