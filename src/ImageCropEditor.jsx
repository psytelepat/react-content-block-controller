import React from 'react'

import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

import { ModalForm, IconedButton, ModalCloseButton } from './styles'

class ImageCropEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            targetWidth: 0,
            targetHeight: 0,
            targetAspect: 1,
            imageURL: null,
            isLoading: false,
            isLoaded: false,
            error: false,
        };

        this.url = this.props.url;
    }

    fetchData() {
        this.setState({isLoading: true}, () =>  fetch(this.url)
            .then(resp => resp.json())
            .then(
                resp => {
                    this.setState({
                        targetWidth: resp.targetWidth||0,
                        targetHeight: resp.targetHeight||0,
                        targetAspect: resp.targetAspect||(16/9),
                        imageURL: resp.imageURL,
                        isLoading: false,
                        isLoaded: true
                    });
                },
                error => {

                }
            ));
    }

    componentDidMount(){
        this.setState({isLoading: true}, this.fetchData())
    }

    saveData() {
        this.setState({isLoading: true}, () => fetch(this.url,{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.getData()),
            })
            .then(resp => {
                this.setState({isLoading: false,});
                this.props.onClose();
            })
        );
    }

    getData() {
        return {
            _token: document.getElementsByName('csrf-token')[0].getAttribute('content'),
            x: this.state.x,
            y: this.state.y,
            width: this.state.width,
            height: this.state.height,
        }
    }

    onCrop(event) {
        this.setState({
            width: Math.round(event.detail.width),
            height: Math.round(event.detail.height),
            x: Math.round(event.detail.x),
            y: Math.round(event.detail.y),
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <ModalForm>
                {this.state.imageURL &&
                    <Cropper
                        src={this.state.imageURL}
                        style={{width: 800, height: Math.round(800/this.state.targetAspect),}}
                        aspectRatio={this.state.targetAspect}
                        crop={this.onCrop.bind(this)}
                    />
                }
                <IconedButton icon="save" buttonColor="success" name="сохранить" onClick={this.saveData.bind(this)} />
                <ModalCloseButton onClick={this.props.onClose} />
            </ModalForm>
        );
    }
}

export default ImageCropEditor