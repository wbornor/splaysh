/**
 * Created by wesbornor on 12/27/16.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Nav, NavItem} from 'react-bootstrap';
import {fetchItemsByNut} from '../actions/index';

class NutList extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
    }

    renderList() {
        const {entities, activeNut, fetchItemsByNut} = this.props;
        try {
            const nuts = entities.nuts;
            let orderedNuts = [nuts.all, nuts.talknut, nuts.favnut, nuts.photonut, nuts.projectnut, nuts.analnut,
                nuts.budnut, nuts.wishnut, nuts.medianut, nuts.vidinut, nuts.audinut, nuts.mapnut];

            return orderedNuts.map(orderedNut => {
                return (
                    <NavItem
                        key={orderedNut.id}
                        onClick={() => fetchItemsByNut(orderedNut.type)}
                        active={orderedNut.id === activeNut.toLowerCase()}
                    >
                        {orderedNut.title}
                    </NavItem>
                )
            });
        }catch (exception){
            return (<div/>);
        }
    }

    render() {
        return (
            <Nav
                bsStyle="pills"
            >
                {this.renderList()}
            </Nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        entities: state.entities,
        activeNut: state.activeNut,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchItemsByNut: fetchItemsByNut
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NutList);
