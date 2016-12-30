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
        const {fetchItems, activeNut, entities} = this.props;


        if (activeNut && entities.nuts[activeNut]) {
            if (entities.nuts[activeNut].items && entities.nuts[activeNut].items.length === 0) {
                return (
                    <h6>
                        No items for {activeNut}...
                    </h6>
                );
            }
        } else if (entities.allItems.length === 0) {
            return (
                <h6>
                    No items...
                </h6>
            );
        }

        if (!entities.lastEvaluatedKey) {
            return (
                <h6>
                    No more...
                </h6>
            );
        }

        return (
            <a
                href="#"
                onClick={() => fetchItems(entities.lastEvaluatedKey)}
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

function

mapStateToProps(state) {
    return {
        entities: state.entities,
        activeNut: state.activeNut
    };
}

function

matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchItems: fetchItems,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MoreItems);