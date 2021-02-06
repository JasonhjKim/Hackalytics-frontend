import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import styled from 'styled-components';

import Header from './header';
import Form from './form';

export default class App extends Component {
    render () {
        return (
            <Container>
                <Col>
                    <Header />    
                    <Form />
                </Col>
            </Container>
        )
    }
}