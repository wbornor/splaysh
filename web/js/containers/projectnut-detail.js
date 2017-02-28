/**
 * Created by wesbornor on 1/16/17.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Media, Image} from 'react-bootstrap';

import {GetNutThumbnailUrl} from '../model/nuts';
import {unescapeHTML} from '../util';


class ProjectnutItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    static isProjectnutItem(item) {
        return item.nut_type === 'PROJECTNUT';
    }

    static getFormattedContent(item) {
        let content = unescapeHTML(item.content.toString());

        return content;
    }

    static getItemBody(item) {
        const content = ProjectnutItemDetail.getFormattedContent(item);

        return (<div>
            <p
                dangerouslySetInnerHTML={{__html: content}}
            />
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
                    {ProjectnutItemDetail.getItemBody(item)}
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

export default connect(mapStateToProps)(ProjectnutItemDetail);