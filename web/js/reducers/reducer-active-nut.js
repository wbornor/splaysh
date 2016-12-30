/**
 * Created by wesbornor on 12/28/16.
 */

import {  NUT_SELECTED } from '../actions/index'

export default function (state = null, action) {
    switch (action.type) {
        case 'NUT_SELECTED':
            return action.nut;
    }
    return state;
}