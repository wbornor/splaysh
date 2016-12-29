/**
 * Created by wesbornor on 12/27/16.
 */
import React, {Component} from 'react';
import ItemList from '../containers/items-list';
import ItemDetail from '../containers/item-detail';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
    }

    componentDidMount() {
        this.interval = setInterval(
            this.increment.bind(this),
            1000
        )
    }

    increment() {
        this.setState(({counter}) => {
            return {counter: counter + 1};
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const {counter} = this.state;

        return (
            <header>
                <h1>Splaysh</h1>
                <div>{counter}</div>
                <hr/>
                <ItemList/>
                <hr/>
                <ItemDetail/>
            </header>
        );
    }
}
