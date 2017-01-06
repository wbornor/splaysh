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

    isTweet(item) {
        return item.hasOwnProperty('tweet::created_at');
    }

    getFormattedTweetContent(item) {
        let content = item.content.toString();

        try {
            const userMentions = JSON.parse(item['tweet::entities::user_mentions']);
            if (userMentions) {
                userMentions.map(mention => {
                    const href = "https://twitter.com/" + mention.screen_name;
                    const anchor = '<a href="' + href + '">@' + mention.screen_name + '</a>';
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