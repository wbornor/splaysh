/**
 * Created by wesbornor on 12/27/16.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Nav, NavItem} from 'react-bootstrap';
import {selectNut} from '../actions/index';

class NutList extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
    }

    renderList() {
        const {entities, activeNut, selectNut} = this.props;
        const nuts = entities.nuts;
        let orderedNuts = [nuts.all, nuts.talknut, nuts.favnut, nuts.photonut, nuts.projectnut, nuts.analnut,
            nuts.budnut, nuts.wishnut, nuts.medianut, nuts.vidinut, nuts.audinut, nuts.mapnut];

        return orderedNuts.map(orderedNut => {
            return (
                <NavItem
                    onClick={() => selectNut(orderedNut.id)}
                    active={orderedNut.id === activeNut}
                >
                    {orderedNut.title}
                </NavItem>
            )
        });
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
        selectNut: selectNut
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NutList);
