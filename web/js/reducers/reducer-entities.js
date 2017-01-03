/**
 * Created by wesbornor on 12/28/16.
 */
"use strict";
import {RECEIVE_ITEMS, REQUEST_ITEMS} from '../actions/index'

var splayshjson = [
    {
        "content": "RT @GEAppliancesPR: And it all starts with telling Alexa to ask Geneva to preheat the oven. @amazonecho https://t.co/nlhyGdYEyr https://t.c…",
        "create_date": "2016-11-25 14:29:47",
        "id": "9130eb34635e48874db69fb2c3542f0b9b8d3a2edca4dc9e15373b5c2e97ff6d",
        "is_public": 1,
        "nut_id": 1,
        "nut_type": "TALKNUT",
        "title": "@wbornor",
        "tweet::author::id_str": "249904162",
        "tweet::author::name": "Wes Bornor",
        "tweet::author::profile_image_url_https": "https://pbs.twimg.com/profile_images/1937922531/Copy_of_IMG_0837_normal.jpg",
        "tweet::author::screen_name": "wbornor",
        "tweet::created_at": "2016-11-25 14:29:47",
        "tweet::entities::urls": "[{\"url\": \"https://t.co/nlhyGdYEyr\", \"indices\": [104, 127], \"expanded_url\": \"http://ow.ly/GYZu306gMzN\", \"display_url\": \"ow.ly/GYZu306gMzN\"}]",
        "tweet::entities::user_mentions": "[{\"id\": 4738251767, \"indices\": [3, 18], \"id_str\": \"4738251767\", \"screen_name\": \"GEAppliancesPR\", \"name\": \"GE Appliances PR\"}, {\"id\": 2905440476, \"indices\": [92, 103], \"id_str\": \"2905440476\", \"screen_name\": \"amazonecho\", \"name\": \"Amazon Echo\"}]",
        "tweet::id_str": "802157337813327872",
        "url": "https://twitter.com/wbornor/status/802157337813327872"
    },
    {
        "content": "RT @firstbuild: We're very busy here at #CES2016 w/ @Indiegogo showing off Opal, Paragon, and our upcoming cold brew project. https://t.co/…",
        "create_date": "2016-01-08 02:00:47",
        "id": "4f41814b565f8f334dedd1bce9e255a7d43ebf922edac4e132fc1b33cc0ab17d",
        "is_public": 1,
        "nut_id": 1,
        "nut_type": "TALKNUT",
        "title": "@wbornor",
        "tweet::author::id_str": "249904162",
        "tweet::author::name": "Wes Bornor",
        "tweet::author::profile_image_url_https": "https://pbs.twimg.com/profile_images/1937922531/Copy_of_IMG_0837_normal.jpg",
        "tweet::author::screen_name": "wbornor",
        "tweet::created_at": "2016-01-08 02:00:47",
        "tweet::entities::hashtags": "[{\"indices\": [40, 48], \"text\": \"CES2016\"}]",
        "tweet::entities::media": "[{\"source_user_id\": 2359602504, \"source_status_id_str\": \"685257569657462785\", \"expanded_url\": \"http://twitter.com/firstbuild/status/685257569657462785/photo/1\", \"display_url\": \"pic.twitter.com/poJqzaGz1e\", \"url\": \"https://t.co/poJqzaGz1e\", \"media_url_https\": \"https://pbs.twimg.com/media/CYKGGiqUkAA2aOe.jpg\", \"source_user_id_str\": \"2359602504\", \"source_status_id\": 685257569657462785, \"id_str\": \"685257540255387648\", \"sizes\": {\"large\": {\"h\": 768, \"resize\": \"fit\", \"w\": 1024}, \"small\": {\"h\": 255, \"resize\": \"fit\", \"w\": 340}, \"medium\": {\"h\": 450, \"resize\": \"fit\", \"w\": 600}, \"thumb\": {\"h\": 150, \"resize\": \"crop\", \"w\": 150}}, \"indices\": [126, 140], \"type\": \"photo\", \"id\": 685257540255387648, \"media_url\": \"http://pbs.twimg.com/media/CYKGGiqUkAA2aOe.jpg\"}]",
        "tweet::entities::user _mentions": "[{\"id\": 2359602504, \"indices\": [3, 14], \"id_str\": \"2359602504\", \"screen_name\": \"firstbuild\", \"name\": \"FirstBuild\"}, {\"id\": 34732474, \"indices\": [52, 62], \"id_str\": \"34732474\", \"screen_name\": \"Indiegogo\", \"name\": \"Indiegogo\"}]",
        "tweet::id_str": "685279952405540864",
        "url": "https://twitter.com/wbornor/status/685279952405540864"
    },
    {
        "content": "RT @CNET: Wi-Fi and the air conditioner: a summer romance https://t.co/mAwKVmJ0Th https://t.co/T4cgOZL1eP",
        "create_date": "2016-06-29 14:51:07",
        "id": "66be75ee09eb989b7fdc0a4c78f7854c0158b28624b7d815ddbdf4b31ee75db3",
        "is_public": 1,
        "nut_id": 1,
        "nut_type": "TALKNUT",
        "title": "@wbornor",
        "tweet::author::id_str": "249904162",
        "tweet::author::name": "Wes Bornor",
        "tweet::author::profile_image_url_https": "https://pbs.twimg.com/profile_images/1937922531/Copy_of_IMG_0837_normal.jpg",
        "tweet::author::screen_name": "wbornor",
        "tweet::created_at": "2016-06-29 14:51:07",
        "tweet::entities::media": "[{\"source_user_id\": 30261067, \"source_status_id_str\": \"746011184361578496\", \"expanded_url\": \"http://twitter.com/CNET/status/746011184361578496/photo/1\", \"display_url\": \"pic.twitter.com/T4cgOZL1eP\", \"url\": \"https://t.co/T4cgOZL1eP\", \"media_url_https\": \"https://pbs.twimg.com/media/ClpdN4XXEAMtMgo.jpg\", \"source_user_id_str\": \"30261067\", \"source_status_id\": 746011184361578496, \"id_str\": \"746011181333286915\", \"sizes\": {\"large\": {\"h\": 433, \"resize\": \"fit\", \"w\": 770}, \"small\": {\"h\": 382, \"resize\": \"fit\", \"w\": 680}, \"medium\": {\"h\": 433, \"resize\": \"fit\", \"w\": 770}, \"thumb\": {\"h\": 150, \"resize\": \"crop\", \"w\": 150}}, \"indices\": [82, 105], \"type\": \"photo\", \"id\": 746011181333286915, \"media_url\": \"http://pbs.twimg.com/media/ClpdN4XXEAMtMgo.jpg\"}]",
        "tweet::entities::urls": "[{\"url\": \"https://t.co/mAwKVmJ0Th\", \"indices\": [58, 81], \"expanded_url\": \"http://cnet.co/28RzHuu\", \"display_url\": \"cnet.co/28RzHuu\"}]",
        "tweet::entities::user_mentions": "[{\"id\": 30261067, \"indices\": [3, 8], \"id_str\": \"30261067\", \"screen_name\": \"CNET\", \"name\": \"CNET\"}]",
        "tweet::id_str": "748166914762022912",
        "url": "https://twitter.com/wbornor/status/748166914762022912"
    }
];

import {normalize, schema} from 'normalizr';

// Define a nut schema
//const nutSchema = new schema.Entity('nuts');


// Define the item schema
const itemSchema = new schema.Entity('items');

const defaultNuts = {
    all: {
        id: 'all',
        nut_id: 9999,
        type: 'ALL',
        title: 'All',
        thumbnail: 'all.jpg',
        items: []
    },
    talknut: {
        id: 'talknut',
        nut_id: 1,
        type: 'TALKNUT',
        title: 'Talk',
        thumbnail: 'talknut.jpg',
        items: []
    },
    favnut: {
        id: 'favnut',
        nut_id: 2,
        type: 'FAVNUT',
        title: 'Favs',
        thumbnail: 'favnut.jpg',
        items: []
    },
    photonut: {
        id: 'photonut',
        nut_id: 3,
        type: 'PHOTONUT',
        title: 'Photos',
        thumbnail: 'flickr_logo.png',
        items: []
    },
    wishnut: {
        id: 'wishnut',
        nut_id: 4,
        type: 'WISHNUT',
        title: 'Wishlist',
        thumbnail: 'wishnut.jpeg',
        items: []
    },
    medianut: {
        id: 'medianut',
        nut_id: 6,
        type: 'MEDIANUT',
        title: 'Media',
        thumbnail: 'netflix-icon.png',
        items: []
    },
    projectnut: {
        id: 'projectnut',
        nut_id: 7,
        type: 'PROJECTNUT',
        title: 'Projects',
        thumbnail: 'debian.png',
        items: []
    },
    analnut: {
        id: 'analnut',
        nut_id: 8,
        type: 'ANALNUT',
        title: 'Analogies',
        thumbnail: 'Thing1thing2.jpg',
        items: []
    },
    vidinut: {
        id: 'vidinut',
        nut_id: 9,
        type: 'VIDINUT',
        title: 'Videos',
        thumbnail: 'vidinut.jpeg',
        items: []
    },
    audinut: {
        id: 'audinut',
        nut_id: 10,
        type: 'AUDINUT',
        title: 'Audio',
        thumbnail: 'headphones.jpg',
        items: []
    },
    budnut: {
        id: 'budnut',
        nut_id: 12,
        type: 'BUDNUT',
        title: 'Buds',
        thumbnail: 'Facebook-Icon.png',
        items: []
    },
    mapnut: {
        id: 'mapnut',
        nut_id: 13,
        type: 'MAPNUT',
        title: 'Maps',
        thumbnail: 'mapnut.jpeg',
        items: []
    }
};

const defaultEntities = {
    items: {},
    nuts: defaultNuts,
};

export default (entities = defaultEntities, action) => {
    action.items = splayshjson;

    switch (action.type) {
        case REQUEST_ITEMS:
            return Object.assign({}, entities, {
                isFetching: true,
                isStale: false
            });
        case RECEIVE_ITEMS:

            //entities: {
            //  all: {
            //       type: 'All',
            //       thumbnail: 'all.jpg',
            //       items: [ 9393..., 1913..., 983311..., ...]
            //  }
            //  nuts: {
            //     1: {
            //          type: 'Talknut',
            //          thumbnail: 'talknut.jpg',
            //          items: [ 42 ]
            //     }
            //  },
            //
            //  items: {
            //     42: {
            //         id: 42,
            //         title: 'Confusion about Flux and Relay',
            //         nut_id: 2,
            //         ...
            //     }
            //   },
            //
            //}

            //for every new incoming item:
            //  normalize the item record
            //  append it to `entities.items`
            //  add the `item.id`'s to the `entity.nut.all.items` array
            //  add the `item.id`'s to the applicable `entity.nut` `items` array

            if (!action || !action.items) {
                return entities;
            }

            let out = Object.assign({}, entities);

            action.items.forEach(actionItem => {
                const normalizedEntityData = normalize(actionItem, itemSchema);

                out.items[actionItem.id] = normalizedEntityData.entities.items[actionItem.id];
                out.nuts.all.items.push(actionItem.id);
                out.nuts[actionItem.nut_type.toLowerCase()].items.push(actionItem.id);
            });

            out.isFetching = false;
            out.isStale = false;
            out.lastUpdated = action.receivedAt;
            out.lastEvaluatedKey = action.lastEvaluatedKey;

            return out;
        default:
            return entities
    }
}