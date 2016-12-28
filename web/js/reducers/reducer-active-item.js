/**
 * Created by wesbornor on 12/28/16.
 */

// "state = null" is set so that we don't throw an error when app first boots up
export default function (state = null, action) {
    switch (action.type) {
        case 'ITEM_SELECTED':
            return action.payload;
            break;
    }
    return state;
}