import React from 'react'

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import AbstractContentBlock from './AbstractContentBlock'

import { ContentBlock, editorConfig } from '../styles'

class Text extends AbstractContentBlock {
    constructor(props) {
        super(props)
        this.state.editorState = this.turnContentToEditorState(this.props.data.content)
    }

    getData() {
        return {
            content: this.getHTMLContent(),
        }
    }

    getHTMLContent() {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    onContent(editorState) {
        this.setState({editorState: editorState})
    }

    renderForm() {
        return (
            <ContentBlock editor>
                {this.toolBox()}
                <Editor editorState={this.state.editorState} onEditorStateChange={this.onContent.bind(this)} toolbar={editorConfig} />
                {this.saveButton()}
            </ContentBlock>
        )
    }

    renderView() {
        return (
            <ContentBlock>
                {this.toolBox()}
                <div dangerouslySetInnerHTML={{__html: this.getHTMLContent()}}></div>
            </ContentBlock>
        )
    }
}

export default Text;