import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import styled from 'styled-components';

export default class Header extends Component {
    render () {
        return (
            <StyledHeader>
                <Title>Company Title</Title>
            </StyledHeader>
        )
    }
}
 

const StyledHeader = styled(Row)`
    height: 75px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
`

const Title = styled.div`
    font-size: 2em;
    font-weight: bold;
    
`