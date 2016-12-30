/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectItem, selectNut, fetchItems} from '../actions/index'


class ItemList extends Component {
    constructor(props) {
        super(props);
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const {fetchItems, selectNut, entities} = this.props;
        fetchItems(entities.lastEvaluatedKey);
        selectNut('all');
    }

    componentWillReceiveProps(nextProps) {
        const {fetchItems, activeNut, entities} = nextProps;

        if (nextProps.activeNut !== activeNut) {
            fetchItems(entities.lastEvaluatedKey);
            //TODO this should call a new action to present a nut subset of items
        }
    }

    handleRefreshClick(e) {
        e.preventDefault();

        //TODO this can refresh a nut too so change this action creator to something other than `fetchItems`
        const {fetchItems, activeNut} = this.props;
        fetchItems();
    }

    renderList() {
        const {entities, activeNut, selectItem} = this.props;

        let nut = entities.nuts[activeNut || 'all'];

        return nut.items.map(itemId => {
            const item = entities.items[itemId];
            return (
                <li
                    key={itemId}
                    onClick={() => selectItem(item)}
                >
                    {item.content}
                </li>
            );
        });
    }

    render() {
        return (
            <ul>
                {this.renderList()}
            </ul>

        );
    }
}

// Get apps state and pass it as props to ItemList
//      > whenever state changes, the ItemList will automatically re-render
function mapStateToProps(state) {
    return {
        entities: state.entities,
        activeNut: state.activeNut,
    };
}

// Get actions and pass them as props to to ItemList
//      > now ItemList has this.props.selectItem
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectItem: selectItem,
        fetchItems: fetchItems,
        selectNut: selectNut
    }, dispatch);
}

// We don't want to return the plain ItemList (component) anymore, we want to return the smart Container
//      > ItemList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(ItemList);