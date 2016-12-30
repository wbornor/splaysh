"use strict";
import 'aws-sdk/dist/aws-sdk';
const AWS = window.AWS;

AWS.config.setPromisesDependency(require('bluebird'));

export const selectItem = (item) => {
    console.log("You clicked on item: ", item.first);
    return {
        type: 'ITEM_SELECTED',
        payload: item
    }
};

export const NUT_SELECTED = 'NUT_SELECTED';
export const selectNut = (nut = 'all') => {
    return {
        type: NUT_SELECTED,
        nut: nut
    }
};

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
function requestItems() {
    return {
        type: REQUEST_ITEMS
    }
}

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
function receiveItems(result) {
    let action = {
        type: RECEIVE_ITEMS,
        items: result.Items,
        receivedAt: Date.now()
    };

    if(result.LastEvaluatedKey){
        action.lastEvaluatedKey = result.LastEvaluatedKey;
    }

    return action;
}

export function fetchItems(lastEvaluatedKey) {

    return function (dispatch) {
        dispatch(requestItems());

        //TODO move these to a config file
        const readOnlyCredentials = new AWS.Credentials(
            'AKIAIGPPD77VYJNNU2IQ',
            'McjQcGxHtIXdHfibvyEhXZfj8Zu+2+KMrna/zQQU'
        );

        AWS.config.update({
            region: "us-east-1",
            credentials: readOnlyCredentials
        });

        //TODO move these to a config file
        let params = {
            TableName: "splayshdb.prd.entry",
            Limit: 50
        };

        if(lastEvaluatedKey){
            params.ExclusiveStartKey = lastEvaluatedKey;
        }

        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const scanPromise = dynamoDb.scan(params).promise();
        scanPromise.then(result => {
            console.log("dynamodb query succeeded.");
            dispatch(receiveItems(result))
        }).catch(err => {
            // handle error
            console.error('dynamodb query failed: ' + JSON.stringify(err));
        });
    }
}

// function shouldFetchItems(state, nut) {
//     const posts = state.itemsByNut[nut];
//     if (!posts) {
//         return true
//     } else if (posts.isFetching) {
//         return false
//     } else {
//         return posts.didInvalidate
//     }
// }
//
// export function fetchItemsIfNeeded(nut) {
//     return (dispatch, getState) => {
//         if (shouldFetchItems(getState(), nut)) {
//             return dispatch(fetchItems(nut))
//         }
//     }
// }