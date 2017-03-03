/**
 * Created by wesbornor on 1/16/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Media, Image} from 'react-bootstrap';

import {GetNutThumbnailUrl} from '../model/nuts';
import {unescapeHTML} from '../util';


class MedianutItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    static isMedianutItem(item) {
        return item.nut_type === 'MEDIANUT';
    }

    static getFormattedContent(item) {
        let content = unescapeHTML(item.content.toString());

        return content;
    }

    static getItemBody(item) {
        const content = MedianutItemDetail.getFormattedContent(item);

        return (<div>
            <p
                dangerouslySetInnerHTML={{__html: content}}
            />
        </div>);
    }


    render() {
        const {item} = this.props;

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
                    <Image
                        rounded={true}
                        src={item['TODO']}
                    />
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
                    {MedianutItemDetail.getItemBody(item)}
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

export default connect(mapStateToProps)(MedianutItemDetail);