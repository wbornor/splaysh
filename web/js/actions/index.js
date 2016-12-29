"use strict";

import Promise from 'bluebird';
import 'aws-sdk/dist/aws-sdk';
const AWS = window.AWS;

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
        items: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPosts(nut) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestItems(nut));

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`http://www.reddit.com/r/${nut}.json`)
            .then(response => response.json())
            .then(json =>

                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                dispatch(receiveItems(nut, json))
            );

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}

export function fetchItems(nut) {

    return function (dispatch) {
        dispatch(requestItems(nut));

        AWS.config.update({
            region: "us-east-1",
            endpoint: "http://localhost:3000"
        });

        //const dynamoDb = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient());
        const dynamoDb = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: "splayshdb.prd.entry",
            // KeyConditionExpression: "#yr = :yyyy",
            // ExpressionAttributeNames: {
            //     "#yr": "year"
            // },
            // ExpressionAttributeValues: {
            //     ":yyyy": 1985
            // }
        };

        dynamoDb.scan(params)
            .then(result => {
                // Do something else.
                console.log("Query succeeded.");
                data.Items.forEach(function (item) {
                    console.log(" -", item.year + ": " + item.title);
                });
                dispatch(receiveItems(nut, json))
            }, err => {
                // handle error
                console.error('dynamodb query failed: ' + JSON.stringify(err));
            })
            .then(json => {
                    dispatch(receiveItems(nut, json))
                }
            );

    }

}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit];
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit))
        }
    }
}