import React from 'react'

import { LabeledInput,ModalForm, IconedButton, ModalCloseButton } from './styles'

class ImageDataEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.title||"",
            description: props.description||"",
            alt: props.alt||"",
            href: props.href||"",
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
                        title: resp.title||"",
                        description: resp.description||"",
                        alt: resp.alt||"",
                        href: resp.href||"",
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
            title: this.state.title,
            description: this.state.description,
            alt: this.state.alt,
            href: this.state.href,
        }
    }

    onTitleChange(event) {
        this.setState({title: event.target.value});
    }
    
    onDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    onAltChange(event) {
        this.setState({alt: event.target.value});
    }

    onHrefChange(event) {
        this.setState({href: event.target.value});
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <ModalForm>
                <ModalCloseButton onClick={this.props.onClose} />
                <LabeledInput title="Title" value={this.state.title} onChange={this.onTitleChange.bind(this)} />
                <LabeledInput title="Description" value={this.state.description} onChange={this.onDescriptionChange.bind(this)} />
                <LabeledInput title="Alt" value={this.state.alt} onChange={this.onAltChange.bind(this)} />
                <LabeledInput title="Href" value={this.state.href} onChange={this.onHrefChange.bind(this)} />
                <IconedButton icon="save" buttonColor="success" name="сохранить" onClick={this.saveData.bind(this)} />
            </ModalForm>
        );
    }
}

export default ImageDataEditor