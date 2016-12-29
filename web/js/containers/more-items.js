/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchItems} from '../actions/index'


class MoreItems extends Component {
    constructor(props) {
        super(props);
    }


    renderLink() {
        const {fetchItems, activeNut, itemsByNut} = this.props;

        if (typeof itemsByNut[activeNut] === "undefined") {
            return (
                <h6>
                    No items for {activeNut}...
                </h6>
            );
        }

        const lastEvaluatedKey = itemsByNut[activeNut].lastEvaluatedKey;

        if (!lastEvaluatedKey) {
            return (
                <h6>
                    No more...
                </h6>
            );
        }

        return (
            <a
                href="#"
                onClick={() => fetchItems(activeNut, lastEvaluatedKey)}
            >
                Click for more items
            </a>
        );
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
        itemsByNut: state.itemsByNut,
        activeNut: state.activeNut
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchItems: fetchItems,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MoreItems);