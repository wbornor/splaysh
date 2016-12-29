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
export const selectNut = (nut) => {
    console.log("You selected on nut: ", nut);
    return {
        type: NUT_SELECTED,
        payload: nut,
        nut: nut
    }
};

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
function requestItems(nut) {
    return {
        type: REQUEST_ITEMS,
        nut: nut
    }
}

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
function receiveItems(nut, json) {
    return {
        type: RECEIVE_ITEMS,
        nut: nut,
        items: json,
        receivedAt: Date.now()
    }
}

export function fetchItems(nut) {

    return function (dispatch) {
        dispatch(requestItems(nut));

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
        const params = {
            TableName: "splayshdb.prd.entry",
            Limit: 50
        };

        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const scanPromise = dynamoDb.scan(params).promise();
        scanPromise.then(data => {
            // Do something else.
            console.log("dynamodb query succeeded.");
            dispatch(receiveItems(nut, data.Items))
        }).catch(err => {
            // handle error
            console.error('dynamodb query failed: ' + JSON.stringify(err));
        });
    }
}

function shouldFetchItems(state, nut) {
    const posts = state.itemsByNut[nut];
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchItemsIfNeeded(nut) {
    return (dispatch, getState) => {
        if (shouldFetchItems(getState(), nut)) {
            return dispatch(fetchItems(nut))
        }
    }
}