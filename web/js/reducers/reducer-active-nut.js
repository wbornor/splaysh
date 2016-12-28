/**
 * Created by wesbornor on 12/28/16.
 */

import {  NUT_SELECTED } from '../actions/index'

// "state = null" is set so that we don't throw an error when app first boots up
export default function (state = 'reactjs', action) {
    switch (action.type) {
        case 'NUT_SELECTED':
            return action.payload;
            break;
    }
    return state;
}