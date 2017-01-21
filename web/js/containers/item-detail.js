/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Media, Image} from 'react-bootstrap';
import linkifyHtml from 'linkifyjs/html';

import TalknutItemDetail from './talknut-detail';
import {GetNutThumbnailUrl} from '../model/nuts';


class ItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    static getItemBody(item) {
        if (TalknutItemDetail.isTweet(item)) {
            return (
                <TalknutItemDetail item={item}/>
            );
        } else {
            let content = item.content;
            if (typeof item.content != 'undefined') {
                content = linkifyHtml(item.content, {
                    defaultProtocol: 'https'
                });
            }

            return (
                <Media.ListItem
                    key={item.id}
                >
                    <Media.Left>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>
                            {item.title}
                        </Media.Heading>
                        {content}
                    </Media.Body>
                    <Media.Right>
                        <Image
                            width={64}
                            height={64}
                            src={GetNutThumbnailUrl(item)}
                            alt="Image"
                            rounded={true}
                        />
                    </Media.Right>
                </Media.ListItem>
            )
        }

    }

    render() {
        const {item, entities} = this.props;

        if(item) {
            return (
                <Media.List>
                    {ItemDetail.getItemBody(item)}
                </Media.List>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        activeItem: state.activeItem,
        entities: state.entities
    };
}

export default connect(mapStateToProps)(ItemDetail);