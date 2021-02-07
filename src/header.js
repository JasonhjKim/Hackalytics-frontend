import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import styled from 'styled-components';

export default class Header extends Component {
    render () {
        return (
            <StyledHeader>
                <Title>Clinical Model Tuner</Title>
            </StyledHeader>
        )
    }
}
 

const StyledHeader = styled(Row)`
    height: 65px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
    margin: 0;
`

const Title = styled.div`
    font-size: 2em;
    font-weight: bold;
    color: #2B2B2B;
    font-family: 'Roboto Slab', serif;
`