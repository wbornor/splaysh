/**
 * Created by wesbornor on 12/28/16.
 */

import {  NUT_SELECTED } from '../actions/index'

// "state = null" is set so that we don't throw an error when app first boots up
export default function (state = null, action) {
    switch (action.type) {
        case 'NUT_SELECTED':
            return action.nut;
            break;
    }
    return state;
}