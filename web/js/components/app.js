/**
 * Created by wesbornor on 12/27/16.
 */
import React, {Component} from 'react';
import ItemList from '../containers/items-list';
import MoreItems from '../containers/more-items';
import NutList from '../containers/nut-list';
import { Col, Row } from 'react-bootstrap';


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

    static getFooterStyle() {
        return {
            textAlign: 'center',
            padding: '30px 0',
            marginTop: '70px',
            borderTop: '1px solid #e5e5e5',
            backgroundColor: '#f5f5f5'
        };
    }

    render() {
        const {counter} = this.state;

        return (
            <header>
                <h1>Splaysh</h1>
                <Row>
                    <Col md={12}>
                        <NutList/>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={12}>
                        <ItemList/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <MoreItems/>
                    </Col>
                </Row>
                <footer className="footer">
                    <div style={App.getFooterStyle()}>
                        <p>splaysh</p>
                        <p>{counter}</p>
                    </div>
                </footer>
            </header>
        );
    }
}
