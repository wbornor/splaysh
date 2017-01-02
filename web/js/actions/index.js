"use strict";
import {Config} from '../config';
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

        const readOnlyCredentials = new AWS.Credentials(
            Config.aws.awsAccessKeyId,
            Config.aws.awsSecretAccessKeyId,
        );

        AWS.config.update({
            region: Config.aws.region,
            credentials: readOnlyCredentials
        });

        let params = {
            TableName: Config.aws.itemsTableName,
            Limit: Config.aws.itemsTableFetchLimit,
            IndexName: Config.aws.itemsTableNutIndex,
            KeyConditionExpression: "#nut = :nutval and #create >= :date",
            ExpressionAttributeNames:{
                "#nut": "nut_id",
                "#create": "create_date"
            },
            ExpressionAttributeValues: {
                ":date":"2006-06-28 0:0:0",
                ":nutval": 1,
            },
            // ScanIndexForward: false,
        };

        if(lastEvaluatedKey){
            params.ExclusiveStartKey = lastEvaluatedKey;
        }

        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        // const scanPromise = dynamoDb.scan(params).promise();
        // scanPromise.then(result => {
        //     console.log("dynamodb query succeeded.");
        //     dispatch(receiveItems(result))
        // }).catch(err => {
        //     // handle error
        //     console.error('dynamodb query failed: ' + JSON.stringify(err));
        // });

        const queryPromise = dynamoDb.query(params).promise();
        queryPromise.then(result => {
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