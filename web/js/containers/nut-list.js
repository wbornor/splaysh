/**
 * Created by wesbornor on 12/27/16.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectNut} from '../actions/index'

class NutList extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
    }

    getOlStyle() {
        return 'list-inline'
    }

    getLiStyle(nutId) {
        let {activeNut} = this.props;
        let style = '';
        style += 'btn';

        if(activeNut === nutId){
            style += ' btn-default'
        } else {
            style += ' btn-link'
        }
        return style
    }

    renderList() {
        const {entities, activeNut, selectNut} = this.props;
        const nuts = entities.nuts;
        let orderedNuts = [nuts.all, nuts.talknut, nuts.favnut, nuts.photonut, nuts.projectnut, nuts.analnut,
            nuts.budnut, nuts.wishnut, nuts.medianut, nuts.vidinut, nuts.audinut, nuts.mapnut];

        //TODO highlight selected nut
        return orderedNuts.map(orderedNut => {
            return (
                <li
                    key={orderedNut.id}
                    onClick={() => selectNut(orderedNut.id)}
                    className={this.getLiStyle(orderedNut.id)}
                >
                    {orderedNut.title}
                </li>
            )
        });
    }

    render() {
        return (
            <ol
                className={this.getOlStyle()}
            >
                {this.renderList()}
            </ol>
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
