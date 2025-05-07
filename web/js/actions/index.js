"use strict";
import {Config} from '../config';
import moment from 'moment';
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

export function fetchItems(nutType='TALKNUT', page=1) {
    nutType = nutType.toUpperCase();
    return function (dispatch) {
        dispatch(requestItems(nutType));

        // Construct S3 URL for the specific nut type and page
        const nutTypeKey = nutType.toLowerCase().replace('nut', '');
        const s3Url = `https://${Config.aws.staticDataBucket}.s3.amazonaws.com/data/posts/${nutTypeKey}/page_${page}.json`;

        fetch(s3Url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(items => {
                dispatch(receiveItems({
                    Items: items,
                    nut_type: nutType
                }));
            })
            .catch(error => {
                console.error('Error fetching items:', error);
                dispatch(receiveItems({
                    Items: [],
                    nut_type: nutType
                }));
            });
    };
}

export function fetchItemsByNut(nutType='TALKNUT', lastEvaluatedKey) {
    nutType = nutType.toUpperCase();

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
            KeyConditionExpression: "#nut = :nutval and #create <= :date",
            ExpressionAttributeNames:{
                "#nut": "nut_type",
                "#create": "create_date"
            },
            ExpressionAttributeValues: {
                ":date":moment(new Date()).utc().format("YYYY-MM-DD HH:mm:ss"),
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
            dispatch(selectNut(nutType))
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