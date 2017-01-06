/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';


class ItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    static isTweet(item) {
        return item.hasOwnProperty('tweet::created_at');
    }

    getEnrichedMentions(content, mentions) {
        try {
            const userMentionsJson = JSON.parse(mentions);
            userMentionsJson.map(mention => {
                const href = "https://twitter.com/" + mention.screen_name;
                const anchor = '<a href="' + href + '">@' + mention.screen_name + '</a>';
                content = content.replace('@' + mention.screen_name, anchor);
            });
        } catch (err) {
            console.log('error trying to parse JSON: ' + err);
        }

        return content;
    }

    getEnrichedHashTags(content, hashTags) {
        try {
            const hashTagsJson = JSON.parse(hashTags);
            hashTagsJson.map(tag => {
                const href = "https://twitter.com/#" + tag.text;
                const anchor = '<a href="' + href + '">#' + tag.text + '</a>';
                content = content.replace('#' + tag.text, anchor);
            });
        } catch (err) {
            console.log('error trying to parse JSON: ' + err);
        }

        return content;
    }

    getEnrichedUrls(content, urls) {
        try {
            const urlsJson = JSON.parse(urls);
            urlsJson.map(url => {
                const href = url.url;
                const anchor = '<a href="' + href + '">' + url.display_url + '</a>';
                content = content.replace(url.url, anchor);
            });
        } catch (err) {
            console.log('error trying to parse JSON: ' + err);
        }

        return content;
    }

    getFormattedTweetContent(item) {
        let content = item.content.toString();

        content = this.getEnrichedMentions(content, item['tweet::entities::user_mentions']);
        content = this.getEnrichedHashTags(content, item['tweet::entities::hashtags']);
        content = this.getEnrichedUrls(content, item['tweet::entities::urls']);

        return content;
    }

    getItemBody(item) {
        let content = item.content;

        if (ItemDetail.isTweet(item)) {
            content = this.getFormattedTweetContent(item);
        }
        return (
            <Col sm={8}
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
                <Row>
                    <Col sm={4}>
                        {item.title}
                    </Col>
                    <Col sm={4}>
                        <img
                            src={item['tweet::author::profile_image_url_https']}
                        />
                    </Col>
                </Row>
                <Row>
                    {this.getItemBody(item)}
                </Row>
                <Row>
                    <Col sm={8}>
                        {item.create_date}
                    </Col>
                </Row>
            </div>
        )
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