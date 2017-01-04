/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';


class ItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    isTweet(item) {
        return item.hasOwnProperty('tweet::created_at');
    }

    getFormattedTweetContent(item) {
        let content = item.content.toString();

        //TODO this is still VERY messed up
        try {
            const userMentions = JSON.parse(item['tweet::entities::user_mentions']);
            if (userMentions) {
                userMentions.map(mention => {
                    const href = "https://twitter.com/" + mention.screen_name;
                    const anchor = '<a href="'+ href + '">@' + mention.screen_name + '</a>';
                    content = content.replace('@' + mention.screen_name, anchor)
                });
            }
        } catch (err) {
            console.log('error trying to parse JSON: ' + err);
        }

        return content;
    }

    getItemBody(item) {
        let content = item.content;

        if (this.isTweet(item)) {
            content = this.getFormattedTweetContent(item);
        }
        return (
            <div
                className={'col-sm-8 text-left'}
                dangerouslySetInnerHTML={{__html: content}}
            />
        )
    }

    render() {
        const {itemId, entities} = this.props;

        if (!itemId) {
            return (
                null
            )
        }

        const item = entities.items[itemId];

        if (!item) {
            return (
                null
            )
        }

        return (
            <div>
                <div
                    className={'row'}
                >
                    <strong
                        className={'col-sm-4 text-left'}
                    >
                        {item.title}
                    </strong>
                    <img
                        className={'col-sm-4 text-right'}
                        src={item['tweet::author::profile_image_url_https']}
                    />
                </div>
                <div
                    className={'row'}
                >
                    {this.getItemBody(item)}
                </div>
                <div
                    className={'row'}
                >
                    <p
                        className={'col-sm-8 text-left'}
                    >
                        {item.create_date}
                    </p>
                </div>
            </div>
        );
    }
}

// "state.activeItem" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        activeItem: state.activeItem,
        entities: state.entities
    };
}

export default connect(mapStateToProps)(ItemDetail);