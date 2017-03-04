/**
 * Created by wesbornor on 1/16/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Media, Image} from 'react-bootstrap';
import linkifyHtml from 'linkifyjs/html';

import {GetNutThumbnailUrl} from '../model/nuts';
import {unescapeHTML} from '../util';


class TalknutItemDetail extends Component {
    constructor(props) {
        super(props);
    }


    static isTalknutItem(item) {
        return item.nut_type === 'TALKNUT';
    }

    static isTweet(item) {
        return item.hasOwnProperty('tweet::id_str');
    }

    static getEnrichedMentions(content, mentions) {
        try {
            if( typeof mentions === 'string'){
                mentions = JSON.parse(mentions);
            }


            mentions.map(mention => {
                const href = "https://twitter.com/" + mention.screen_name;
                const anchor = '<a href="' + href + '" target="_blank">@' + mention.screen_name + '</a>';
                content = content.replace('@' + mention.screen_name, anchor);
            });
        } catch (ignore) {
            console.error(ignore);
        }

        return content;
    }

    static getEnrichedHashTags(content, hashTags) {
        try {
            if( typeof hashTags === 'string'){
                hashTags = JSON.parse(hashTags);
            }

            hashTags.map(tag => {
                const href = "https://twitter.com/#" + tag.text;
                const anchor = '<a href="' + href + '" target="_blank">#' + tag.text + '</a>';
                content = content.replace('#' + tag.text, anchor);
            });
        } catch (ignore) {
            console.error(ignore);
        }

        return content;
    }

    static getEnrichedUrls(content, urls) {
        try {

            if( typeof urls === 'string'){
                urls = JSON.parse(urls);
            }

            urls.map(url => {
                const href = url.url;
                const anchor = '<a href="' + href + '" target="_blank">' + url.display_url + '</a>';
                content = content.replace(url.url, anchor);
            });
        } catch (ignore) {
            console.error(ignore);
        }

        return content;
    }

    static getFormattedTweetContent(item) {
        let content = item.content.toString();

        content = TalknutItemDetail.getEnrichedMentions(content, item['tweet::entities::user_mentions']);
        content = TalknutItemDetail.getEnrichedHashTags(content, item['tweet::entities::hashtags']);
        content = TalknutItemDetail.getEnrichedUrls(content, item['tweet::entities::urls']);
        content = linkifyHtml(content, {
            defaultProtocol: 'https'
        });

        return content;
    }

    static getFormattedContent(item) {
        let content = item.content.toString();

        content = unescapeHTML(content);

        return content;
    }

    static getTweetMedia(media) {
        try {
            if( typeof media === 'string'){
                media = JSON.parse(media);
            }

            return media.map(media => {
                return (
                    <Image
                        rounded={true}
                        responsive={true}
                        key={media.media_url_https}
                        src={media.media_url_https}
                    />
                );
            })

        } catch (ignore) {
        }

        return null;
    }

    static getItemBody(item) {
        try {
            const content = TalknutItemDetail.isTweet(item) ?
                TalknutItemDetail.getFormattedTweetContent(item) : TalknutItemDetail.getFormattedContent(item);
            const media = TalknutItemDetail.getTweetMedia(item['tweet::entities::media']);

            return (<div>
                <p
                    dangerouslySetInnerHTML={{__html: content}}
                />
                <div>{media}</div>
            </div>);
        } catch (exception){
            return (<div/>);
        }
    }


    render() {
        const {item, entities} = this.props;

        if (!item) {
            return (
                null
            )
        }

        return (
            <Media
                key={item.id}
            >
                <Media.Left>
                    <a
                        href={item.url}
                        target="_blank"
                    >
                        <Image
                            rounded={true}
                            src={item['tweet::author::profile_image_url_https']}
                        />
                    </a>
                </Media.Left>
                <Media.Body>
                    <Media.Heading>
                        <a
                            href={item.url}
                            target="_blank"
                        >
                            {item.title}
                        </a>
                    </Media.Heading>
                    {TalknutItemDetail.getItemBody(item)}
                </Media.Body>
                <Media.Right>
                    <img
                        width={64}
                        height={64}
                        src={GetNutThumbnailUrl(item)}
                        alt="Image"/>
                </Media.Right>
            </Media>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeItem: state.activeItem,
        entities: state.entities
    };
}

export default connect(mapStateToProps)(TalknutItemDetail);