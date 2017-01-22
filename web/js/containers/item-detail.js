/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Media, Image} from 'react-bootstrap';
import linkifyHtml from 'linkifyjs/html';

import TalknutItemDetail from './talknut-detail';
import VidinutItemDetail from './vidinut-detail';
import FavnutItemDetail from './favnut-detail';
import BudnutItemDetail from './budnut-detail';
import {GetNutThumbnailUrl} from '../model/nuts';


class ItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    static getItemBody(item) {
        if (TalknutItemDetail.isTalknutItem(item)) {
            return (
                <TalknutItemDetail item={item}/>
            );
        } else if (VidinutItemDetail.isVidinutItem(item)) {
            return (
                <VidinutItemDetail item={item}/>
            )
        }  else if (FavnutItemDetail.isFavnutItem(item)) {
            return (
                <FavnutItemDetail item={item}/>
            )
        } else if (BudnutItemDetail.isBudnutItem(item)) {
            return (
                <BudnutItemDetail item={item}/>
            )
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

        if (item) {
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