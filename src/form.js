import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import Graph from './graph';


export default class Form extends Component {
    
    state = {
        labelCount: [""],
        py: null,
        type: "",
        nlt: 2,
        nle:10,
        data: null
        // data: {"evalMetrics": {"OG": {"Avg_Accuracy": "0.7796609997749329", "Avg_Loss": "1.501736335541645", "TP": "132.0", "TN": "235.0", "FP": "2.0", "FN": "102.0", "sensitivity": "0.564", "specificity": "0.992"}, "noisy": {"Avg_Accuracy": "0.5024999976158142", "Avg_Loss": "13.87369831174612", "TP": "0.0", "TN": "199.0", "FP": "0.0", "FN": "199.0", "sensitivity": "0.0", "specificity": "1.0"}, "finetuned": {"Avg_Accuracy": "0.6349999904632568", "Avg_Loss": "1.0088409907976166", "TP": "53.0", "TN": "199.0", "FP": "0.0", "FN": "146.0", "sensitivity": "0.266", "specificity": "1.0"}}, "model_path": "./model/pneumonia_id/finetuned_model.pt", "duration": "37.73"}
    }

    componentDidMount() {
        // const socket = io('http://localhost:5000/',  { transport : ['websocket'] })
        // socket.on('connect', (data) => {
        //     this.setState({ sid: socket.id})
        // })

        // socket.emit('connection')

        // socket.on('get_sid', (data) => {
        //     console.log(data)
        // })
    }
    
    handleAddLabelButton(e) {
        e.preventDefault();
        const temp = this.state.labelCount
        temp.push("");
        this.setState({ labelCount: temp })
    }

    handleInputChange(e) {
        const { name, value} = e.target
        console.log(`${name}: ${value}`)
        this.setState({ [name]: value })
    }

    handleOnDrop(i, images) {
        let name = i + "image";
        console.log(images);
        images.map((image) => {
            Object.assign(image, { preview: URL.createObjectURL(image)})
        })
        if(this.state.[name]) {
            this.setState(prevState => ({
                [name]: prevState.[name].concat(images)
            }));
        } else {
            this.setState({
                [name]: images
            })
        }
        console.log(this.state);
    }

    handleOnDropPY(file) {
        console.log(file)
        this.setState({ py: file[0]})
    }

    handleSelectOnChange(e) {
        console.log(e.target.value);
        this.setState({ type: e.target.value })
    }

    handleNumberOnChange(e) {
        this.setState({ nlt: e.target.value })
    }

    handleNumberEpochOnChange(e) {
        this.setState({ nle: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();
        this.state.labelCount.map((ele, i) => {
            this.state.[i +"image"].map((image) => {
                console.log("called", [i+"label"], image);
                formData.append(this.state.[i+"label"], image);
            })
        })
        formData.append("py", this.state.py);
        formData.append("type", this.state.type);
        formData.append("nlt", this.state.nlt)
        formData.append("nle", this.state.nle)
        for(var pair of formData.entries()) {
            console.log(pair);
        }

        axios.post('http://69.172.162.104:25565/api/v1/finetune', formData)
            .then(res => {
                const { data } = res;
                this.setState({data})
                console.log(data);
            })
            .catch(err => console.log(err)) 
    }

    render() {
        return(
            <>
            <StyledForm onSubmit={this.handleSubmit.bind(this)}>
                <FormTitle>Model: </FormTitle>
                <FormComponent>
                    <FormLabel>Google Drive Link:</FormLabel>
                    <Subtitle>Provide google drive link for server to download</Subtitle>
                    <FormGoogleDriveInput type="text" placeholder="Google Drive Link"/>
                </FormComponent>
                <FormComponent>
                    <FormLabel>or Choose:</FormLabel>
                    <FormSelect onChange={this.handleSelectOnChange.bind(this)}>
                        <option>None</option>
                        <option value={"pneumonia_id"}>Pneumonia Dataset</option>
                        <option value={"oct"}>OCT Dataset</option>
                    </FormSelect>
                </FormComponent>
                <FormComponent>
                    <FormLabel>Required Number of Layer Trained</FormLabel>
                    <Subtitle>Number of last layers that model will be trained</Subtitle>
                    <FormTextInput type="number" min={2} value={this.state.nlt} onChange={this.handleNumberOnChange.bind(this)}/>
                </FormComponent>

                <FormComponent>
                    <FormLabel>Required Number of Epoch Trained</FormLabel>
                    <Subtitle>Number of epochs that model will be trained</Subtitle>
                    <FormTextInput type="number" min={10} max={10} value={this.state.nle} onChange={this.handleNumberEpochOnChange.bind(this)}/>
                </FormComponent>

                <FormComponent>
                    <FormLabel>Model Architecture & Preprocessing</FormLabel>
                    <Subtitle>Number of epochs that model will be trained</Subtitle>
                    <Dropzone
                        onDrop={ this.handleOnDropPY.bind(this)}
                        accept=".py"
                    >
                    {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject}) => (
                        <InnerDropzone {...getRootProps({}) }>
                            <input {...getInputProps()} />
                            { !this.state.py && <div>Drag your .py file here</div>}
                            { this.state.py && <File>{this.state.py.name}</File> }
                        </InnerDropzone>
                    )}
                    </Dropzone>
                </FormComponent>

                <FormTitleWrapper>
                    <FormTitle>Labels</FormTitle>
                    <AddLabelButton onClick={this.handleAddLabelButton.bind(this)}>Add Label</AddLabelButton>
                </FormTitleWrapper>
                {
                    this.state.labelCount.map((ele, i) => (
                        <AddLabelWrapper>
                            <FormComponent>
                                <FormLabel>Label Name:</FormLabel>
                                <Subtitle>Classification label name</Subtitle>
                                <FormTextInput type="text" placeholder="Label Name" name={i + "label"} value={this.state.value} onChange={ this.handleInputChange.bind(this) }/>
                            </FormComponent>
                            <FormComponent>
                                <FormLabel>Label Images:</FormLabel>
                                <Dropzone
                                    onDrop={ this.handleOnDrop.bind(this, i)}
                                    multiple
                                >
                                {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject}) => (
                                    <InnerDropzone {...getRootProps({}) }>
                                        <input {...getInputProps()} />
                                        { !this.state.[i + "image"] && "Drag label images"}
                                        <ImageContainer>
                                            { this.state.[i + "image"] ? this.state.[i + "image"].map((image) => 
                                                <Img src={image.preview} />
                                                )
                                            : null}
                                        </ImageContainer>
                                    </InnerDropzone>
                                )}
                                </Dropzone>
                            </FormComponent>
                            <HR />
                        </AddLabelWrapper>
                    ))
                }

                <StyledSubmit type="submit"/>
            </StyledForm>

            { this.state.data && <Graph data={this.state.data} />}
            </>
        )
    }
}


const StyledForm = styled.form`
    // background-color: grey;
    display: flex;
    flex-direction: column;
`

const AddLabelButton = styled.button`
    width: 125px;
    height: 40px;
    align-self: flex-end;
    background-color: #99B898;
    color: white;
    border: none;
    border-radius: 4px;
    
`

const File = styled.div`
    width: 100%;
    height: 50px;
    background-color: #FECEAB;
    color: white;
    text-align: center;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const AddLabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2em;
`

const FormComponent = styled.div`
    margin-bottom : 1em;
    display: flex;
    flex-direction: column;
`

const FormTextInput = styled.input`
    width: 350px;
    border: none; 
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 0.5em 1em;
`

const FormSelect = styled.select`
    border: none; 
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 0.5em 1em;
`

const FormGoogleDriveInput = styled.input`
    border: none; 
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 0.5em 1em;
`

const FormLabel = styled.label`
    margin: 0;
    padding: 0;
    font-size: 0.90em;
    font-weight: bold;
    color: #4E4E4E;
`

const HR = styled.div`
    border-top: 1px solid lightgray;
    margin-top: 1em;
    width: 90%;
    align-self: center;
`

const InnerDropzone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #f5f5f5;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`

const ImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
    max-height: 500px;
`
const FormTitle = styled.h4`
    margin-top: 1em;
    color: #2B2B2B;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid lightgray;
    border-radius: 4px;
    padding: 4px;
    margin: 0.25em
`


const StyledSubmit = styled.input`
    height: 55px;
    background-color: #E84A5F;
    border: none;
    border-radius: 4px;
    color: white;
    margin-bottom: 4em;
`

const Subtitle = styled.div`
    font-size: 0.85em;
    color: gray;
`

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const FormTitleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`


//Color:
// #E84A5F
// #FF847C
// #FECEAB
// #99B898