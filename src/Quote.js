import React from 'react'

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import Image from './Image'
import ToolBox from './ToolBox'
import UploadImage from './UploadImage'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Quote extends Image {

    constructor(props) {
        super(props);

        const blocksFromHtml = htmlToDraft(props.data.content||"");
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);

        this.state.contentEditorState = editorState;

        this.state.title = this.props.data.title||"";
        this.state.description = this.props.data.description||"";
    }

    configureUrls() {
        let url = this.props.url + "/" + this.props.data.grp + "/upload/content-block.quote/";
        this.uploadImageURL = url + "upload/formData";
        this.deleteImageURL = url + "delete";
        this.reposImageURL = url + "repos";
    }

    getData() {
        return {
            content: draftToHtml(convertToRaw(this.state.contentEditorState.getCurrentContent())),
            title: this.state.title,
            description: this.state.description,
        };
    }

    onContentEditorStateChange(contentEditorState) {
        this.setState({
            contentEditorState,
        });
    }

    onTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }

    renderForm() {
        const { contentEditorState } = this.state;
        return  (
            <div className="cntBlk quote">
                <ToolBox toolBoxHandler={this.toolBoxHandler.bind(this)} />
                <span className="cntBlk quoteBlk">
                    <span className="line cnt">
                        <Editor
                          editorState={contentEditorState}
                          onEditorStateChange={this.onContentEditorStateChange.bind(this)}
                        />
                    </span>
                    <span className="line input">
                        <input type="text" className="title-fld" value={this.state.title} onChange={this.onTitleChange.bind(this)} />
                    </span>
                    <span className="line input">
                        <input type="text" className="description-fld" value={this.state.description} onChange={this.onDescriptionChange.bind(this)} />
                    </span>
                    <span className="line fileUpload">
                        {this.sortableGallery()}
                        <div className="controls">
                            <span className="select-all" onClick={this.onToggleAll.bind(this)}>Выбырать все</span> | <span className="delete-selected" onClick={this.onDelete.bind(this)}>Удалить</span>
                        </div>
                        <UploadImage uploadURL={this.uploadImageURL} onSuccess={this.onUploadSuccess.bind(this)} onError={this.onUploadError.bind(this)} handle="quote" />
                    </span>
                </span>
                <div className="btn btn-success btn-sm saveBlock" onClick={this.saveBlock.bind(this)}><i className="fa fa-save"></i> сохранить</div>
            </div>
        );
    }

    renderView() {
        const { contentEditorState } = this.state;
        return (
            <div className="cntBlk quote">
                <ToolBox toolBoxHandler={this.toolBoxHandler.bind(this)} />
                <div dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(contentEditorState.getCurrentContent()))}}></div>
                <div className="quote-person">
                    {this.state.images.length ? <div className="quote-image" style={{backgroundImage: "url("+this.state.images[0].url+")"}}></div> : null }
                    <div className="person">
                        <div className="title">{this.state.title}</div>
                        <div className="description">{this.state.description}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Quote;