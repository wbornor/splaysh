/**
 * Created by wesbornor on 12/28/16.
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectItem, selectNut, fetchPosts} from '../actions/index'


class ItemList extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        console.log('props: ' + JSON.stringify(this.props));
        const {fetchPosts, selectedSubreddit} = this.props;
        fetchPosts(selectedSubreddit || 'reactjs');
    }

    componentWillReceiveProps(nextProps) {
        console.log('props: ' + JSON.stringify(this.props));
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const {fetchPosts, selectedSubreddit} = nextProps;
            fetchPosts(selectedSubreddit || 'reactjs');
        }
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { fetchPosts, selectedSubreddit } = this.props;
        fetchPosts(selectedSubreddit || 'reactjs');
    }

    // handleChange(nextSubreddit) {
    //     this.props.dispatch(selectSubreddit(nextSubreddit))
    // }


    renderList() {
        const {itemsByNut, activeNut, selectItem} = this.props;
        return itemsByNut[activeNut].items.map((items) => {
            return (
                <li
                    key={items.id}
                    onClick={() => selectItem(items)}
                >
                    {items.title}
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
    return bindActionCreators({selectItem: selectItem, fetchPosts: fetchPosts, selectNut: selectNut}, dispatch);
}

// We don't want to return the plain ItemList (component) anymore, we want to return the smart Container
//      > ItemList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(ItemList);