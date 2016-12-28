/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
 * We need "if(!this.props.item)" because we set state to null by default
 * */

class ItemDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.item) {
            return (<div>Select an item...</div>);
        }
        return (
            <div>
                <img src={this.props.item['tweet::author::profile_image_url_https']} />
                <h2>{this.props.item.title}</h2>
                <h3>{this.props.item.content}</h3>
                <h6>{this.props.item.create_date}</h6>
            </div>
        );
    }
}

// "state.activeItem" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        item: state.activeItem
    };
}

export default connect(mapStateToProps)(ItemDetail);