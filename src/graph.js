import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import styled from 'styled-components';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';



export default class Graph extends Component {
    handleData(){
        const { OG, noisy, finetuned } = this.props.data.evalMetrics;
        console.log(OG)
        console.log(noisy)

        return [
            {
                "name": "original",
                "avg_accuracy": Number(OG.Avg_Accuracy),
                "avg_loss": Number(OG.Avg_Loss),
            },
            {
                "name": "distorted",
                "avg_accuracy": Number(noisy.Avg_Accuracy),
                "avg_loss": Number(noisy.Avg_Loss),
            },
            {
                "name": "finetuned",
                "avg_accuracy": Number(finetuned.Avg_Accuracy),
                "avg_loss": Number(finetuned.Avg_Loss),
            }
        ]
    }

    render() {
        const { OG, noisy, finetuned } = this.props.data.evalMetrics;
        console.log(OG)
        console.log(noisy)

        let dataAcc = [
            {
                "name": "original",
                "avg_accuracy": Number(OG.Avg_Accuracy),
            },
            {
                "name": "distorted",
                "avg_accuracy": Number(noisy.Avg_Accuracy),
            },
            {
                "name": "finetuned",
                "avg_accuracy": Number(finetuned.Avg_Accuracy),
            }
        ]

        let dataLoss = [
            {
                "name": "original",
                "avg_loss": Number(OG.Avg_Loss),
            },
            {
                "name": "distorted",
                "avg_loss": Number(noisy.Avg_Loss),
            },
            {
                "name": "finetuned",
                "avg_loss": Number(finetuned.Avg_Loss),
            }
        ]
        let dataSESSPS = [
             {
                "name": "original",
                "specificity": Number(OG.specificity),
                "sensitivity": Number(OG.sensitivity)
            },
            {
                "name": "distorted",
                "specificity": Number(noisy.specificity),
                "sensitivity": Number(noisy.sensitivity)
            },
            {
                "name": "finetuned",
                "specificity": Number(finetuned.specificity),
                "sensitivity": Number(finetuned.sensitivity)
            }
        ]
        return(
            <GraphContainer>
                <GraphWrapper>
                    <FormLabel>Average Accuracy Comparison</FormLabel>
                    <BarChart width={400} height={400} data={dataAcc}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avg_accuracy" fill="#8884d8" />
                    </BarChart>
                </GraphWrapper>

                <GraphWrapper>
                    <FormLabel>Average Loss Comparison</FormLabel>
                    <BarChart width={400} height={400} data={dataLoss}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avg_loss" fill="#82ca9d" />
                    </BarChart>
                </GraphWrapper>    

                <GraphWrapper>
                    <FormLabel>Sensitivity & Specificity Comparison</FormLabel>
                    <BarChart width={600} height={400} data={dataSESSPS}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="specificity" fill="#82ca9d" />
                        <Bar dataKey="sensitivity" fill="#8884d8" />
                    </BarChart>
                </GraphWrapper>  
            </GraphContainer>
        )
    }
}

const GraphContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    flex-wrap: wrap;
`

const GraphWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const FormLabel = styled.label`
    margin: 0;
    padding: 0;
    font-size: 0.90em;
    font-weight: bold;
    color: #4E4E4E;
    align-self: center;
`