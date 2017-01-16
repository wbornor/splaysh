/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchItems, fetchItemsByNut} from '../actions/index'


class MoreItems extends Component {
    constructor(props) {
        super(props);
    }


    renderLink() {
        const {fetchItems, fetchItemsByNut, activeNut, entities} = this.props;

        let nut = entities.nuts[activeNut || 'all'];
        if (nut.items && nut.items.length === 0) {
            return (
                <h6>
                    No items...
                </h6>
            );
        }

        if (!nut.lastEvaluatedKey) {
            return (
                <h6>
                    No more...
                </h6>
            );
        }

        if (activeNut === 'all') {
            return (
                <a
                    href="#"
                    onClick={() => fetchItems(activeNut, nut.lastEvaluatedKey)}
                >
                    Click for more items
                </a>
            );
        } else {
            return (
                <a
                    href="#"
                    onClick={() => fetchItemsByNut(activeNut, nut.lastEvaluatedKey)}
                >
                    Click for more items
                </a>
            );
        }
    }

    render() {

        return (
            <div>
                {this.renderLink()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        entities: state.entities,
        activeNut: state.activeNut
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchItems: fetchItems,
        fetchItemsByNut: fetchItemsByNut,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MoreItems);