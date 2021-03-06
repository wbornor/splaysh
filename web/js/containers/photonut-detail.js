/**
 * Created by wesbornor on 1/16/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Media, Image} from 'react-bootstrap';

import {GetNutThumbnailUrl} from '../model/nuts';
import {unescapeHTML} from '../util';


class PhotonutItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    static isPhotonutItem(item) {
        return item.nut_type === 'PHOTONUT';
    }

    static getItemBody(item) {
        if(!item.content){
            return null;
        }

        const href = "https://www.flickr.com/photos/weslaaaaay/albums/" + item.content;
        return (<div>
            <a
                data-flickr-embed="true"
                href={href}
                title={item.title}
            >
                <img
                    src="https://c1.staticflickr.com/9/8237/8552516619_335c91dba3_z.jpg"
                    width="480"
                    height="640"
                    alt={item.title}
                />
            </a>

        </div>);
    }

    render() {
        const {item} = this.props;

        if (!item || item.is_public === 0) {
            return (
                null
            )
        }

        return (
            <Media
                key={item.id}
            >
                <Media.Left>
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
                    {PhotonutItemDetail.getItemBody(item)}
                </Media.Body>
                <Media.Right>
                    <Image
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

export default connect(mapStateToProps)(PhotonutItemDetail);