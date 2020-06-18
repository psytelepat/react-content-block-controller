import React from 'react'

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import AbstractContentBlock from './AbstractContentBlock'
import ToolBox from './ToolBox'

class Text extends AbstractContentBlock {
    constructor(props) {
        super(props);

        const blocksFromHtml = htmlToDraft(props.data.content||"");
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);

        this.state.contentEditorState = editorState;
    }

    getData() {
        return {
            content: draftToHtml(convertToRaw(this.state.contentEditorState.getCurrentContent())),
        };
    }

    onContentEditorStateChange(contentEditorState) {
        this.setState({
            contentEditorState,
        });
    }

    renderForm() {
        const { contentEditorState } = this.state;
        return (
            <div className="cntBlk text">
                <span className="cntBlk textBlk">
                    <Editor
                      editorState={contentEditorState}
                      onEditorStateChange={this.onContentEditorStateChange.bind(this)}
                    />
                </span>
                <div className="btn btn-success btn-sm saveBlock" onClick={this.saveBlock}><i className="fa fa-save"></i> сохранить</div>
            </div>
        );
    }

    renderView() {
        const { contentEditorState } = this.state;
        return (
            <div className="cntBlk text">
                <ToolBox toolBoxHandler={this.toolBoxHandler} />
                <div dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(contentEditorState.getCurrentContent()))}}></div>
            </div>
        );
    }

    render() {
        return this.state.isForm ? this.renderForm() : this.renderView();
    }
}

export default Text;