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
export const selectNut = (nutType = 'all') => {
    return {
        type: NUT_SELECTED,
        nut: nutType
    }
};

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
function requestItems(nutType) {
    return {
        type: REQUEST_ITEMS,
        nut_type: nutType
    }
}

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
function receiveItems(result) {
    let action = {
        type: RECEIVE_ITEMS,
        items: result.Items,
        nut_type: result.nut_type,
        receivedAt: Date.now()
    };

    if(result.LastEvaluatedKey){
        action.lastEvaluatedKey = result.LastEvaluatedKey;
    }

    return action;
}

export function fetchItems(nutType='TALKNUT', lastEvaluatedKey) {

    return function (dispatch) {

        dispatch(requestItems(nutType));

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
            IndexName: Config.aws.itemsTableIsPublicIndex,
            KeyConditionExpression: "#create >= :date and #ispublic = :publicval",
            ExpressionAttributeNames:{
                "#create": "create_date",
                "#ispublic": "is_public"
            },
            ExpressionAttributeValues: {
                ":date":"2006-06-28 0:0:0",
                ":publicval": 1
            },
            ScanIndexForward: false,
        };

        if(lastEvaluatedKey){
            params.ExclusiveStartKey = lastEvaluatedKey;
        }

        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const queryPromise = dynamoDb.query(params).promise();
        queryPromise.then(result => {
            console.log("dynamodb query succeeded.");
            result['nut_type'] = nutType;
            dispatch(receiveItems(result))
        }).catch(err => {
            // handle error
            console.error('dynamodb query failed: ' + JSON.stringify(err));
        });
    }
}

export function fetchItemsByNut(nutType='TALKNUT', lastEvaluatedKey) {

    return function (dispatch) {

        dispatch(requestItems(nutType));

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
                "#nut": "nut_type",
                "#create": "create_date"
            },
            ExpressionAttributeValues: {
                ":date":"2006-06-28 0:0:0",
                ":nutval": nutType
            },
            ScanIndexForward: false,
        };

        if(typeof lastEvaluatedKey != "undefined"){
            params.ExclusiveStartKey = lastEvaluatedKey;
        }

        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const queryPromise = dynamoDb.query(params).promise();
        queryPromise.then(result => {
            console.log("dynamodb query succeeded.");
            result['nut_type'] = nutType;
            dispatch(receiveItems(result));
            dispatch(selectNut(nutType.toLowerCase()))
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