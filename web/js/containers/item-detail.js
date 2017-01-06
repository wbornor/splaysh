/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Media, Image} from 'react-bootstrap';


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
        } catch (pass) {
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
            <p
                dangerouslySetInnerHTML={{__html: content}}
            />
        )
    }

    static getNutThumbnailUrl(item, nuts){
        const thumb = nuts[item.nut_type.toLowerCase()].thumbnail;
        return 'web/img/' + thumb;
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
            <Media>
                <Media.Left>
                    <Image
                        rounded={true}
                        src={item['tweet::author::profile_image_url_https']}
                    />
                </Media.Left>
                <Media.Body>
                    <Media.Heading>
                        {item.title}
                    </Media.Heading>
                    {this.getItemBody(item)}
                </Media.Body>
                <Media.Right>
                    <Image
                        rounded={true}
                        src={ItemDetail.getNutThumbnailUrl(item, entities.nuts)}
                    />
                </Media.Right>
            </Media>
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