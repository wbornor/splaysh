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
        // this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const {fetchItems, activeNut} = this.props;
        fetchItems && fetchItems(activeNut || 'reactjs');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeNut !== this.props.activeNut) {
            const {fetchItems, activeNut} = nextProps;
            fetchItems && fetchItems(activeNut || 'reactjs');
        }
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const {fetchItems, activeNut} = this.props;
        fetchItems(activeNut || 'reactjs');
    }

    // handleChange(nextSubreddit) {
    //     this.props.dispatch(selectSubreddit(nextSubreddit))
    // }


    renderList() {
        const {itemsByNut, activeNut, selectItem} = this.props;
        if (typeof itemsByNut[activeNut] === "undefined") {
            return (
                <li></li>
            );
        }

        return itemsByNut[activeNut].items.map((item) => {
            return (
                <li
                    key={item.id}
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
        itemsByNut: state.itemsByNut,
        activeNut: state.activeNut
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