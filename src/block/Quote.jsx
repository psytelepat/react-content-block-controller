import React from 'react'

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import Image from './Image'
import UploadGallery from '../UploadGallery'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ContentBlock, editorConfig, LabeledInput } from '../styles'

class Quote extends Image {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            title: this.props.data.title || "",
            description: this.props.data.description || "",
            editorState: this.turnContentToEditorState(this.props.data.content),
        }
        this.imageUploadHandle = "quote";
        this.uploadGalleryURLBase = this.props.url + "/" + this.props.data.grp + "/upload/content-block." + this.imageUploadHandle + "/";
    }

    getHTMLContent() {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    getData() {
        return {
            content: this.getHTMLContent(),
            title: this.state.title,
            description: this.state.description,
        };
    }

    onContent(editorState) {
        this.setState({editorState: editorState,});
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }

    renderForm() {
        return  (
            <ContentBlock editor>
                {this.toolBox()}
                <Editor editorState={this.state.editorState} onEditorStateChange={this.onContent.bind(this)} toolbar={editorConfig} />
                <LabeledInput title="Автор" value={this.state.title} onChange={this.onTitleChange.bind(this)} />
                <LabeledInput title="Об авторе" value={this.state.description} onChange={this.onDescriptionChange.bind(this)} />
                <UploadGallery
                    handle={this.imageUploadHandle}
                    previews={this.props.data.previews}
                    uploadURL={this.uploadGalleryURLBase + "upload/formData"}
                    reposURL={this.uploadGalleryURLBase + "repos"}
                    deleteURL={this.uploadGalleryURLBase + "delete"}
                    editURL={this.uploadGalleryURLBase + "edit"}
                    cropURL={this.uploadGalleryURLBase + "crop"}
                    onUpload={this.onUpload.bind(this)}
                />
                {this.saveButton()}
            </ContentBlock>
        );
    }

    renderView() {
        return (
            <ContentBlock>
                {this.toolBox()}
                <div dangerouslySetInnerHTML={{__html: this.getHTMLContent()}}></div>
                <div className="quote-person">
                    {this.props.data.images.length ? <div className="quote-image" style={{backgroundImage: "url("+this.props.data.images[0].url+")"}}></div> : null }
                    <div className="person">
                        <div className="title">{this.state.title}</div>
                        <div className="description">{this.state.description}</div>
                    </div>
                </div>
            </ContentBlock>
        );
    }
}

export default Quote;