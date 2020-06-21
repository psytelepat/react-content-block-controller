import React from 'react'

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import AbstractContentBlock from './AbstractContentBlock'

import { ContentBlock, editorConfig } from '../styles'

import styled from '@emotion/styled'

const Row = styled.div`
    display: flex;
    flex-flow: row nowrap;
`

const Col = styled.div`
    width: calc(100% - 10px);
    &:first-of-type {
        margin-right: 20px;
    }
`

const ColTitle = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
`

class DoubleColumn extends AbstractContentBlock {
    constructor(props) {
        super(props);
        this.state.editorState1 = this.turnContentToEditorState(props.data.content1)
        this.state.editorState2 = this.turnContentToEditorState(props.data.content2)
    }

    getData() {
        return {
            content1: this.getHTMLContent1(),
            content2: this.getHTMLContent2(),
        };
    }

    getHTMLContent1() {
        return draftToHtml(convertToRaw(this.state.editorState1.getCurrentContent()))
    }

    getHTMLContent2() {
        return draftToHtml(convertToRaw(this.state.editorState2.getCurrentContent()))
    }

    onContent1(editorState) {
        this.setState({editorState1: editorState})
    }

    onContent2(editorState) {
        this.setState({editorState2: editorState})
    }

    renderForm() {
        const { editorState1, editorState2 } = this.state;
        return (
            <ContentBlock editor>
                {this.toolBox()}
                <Row>
                    <Col>
                        <ColTitle>До</ColTitle>
                        <Editor editorState={editorState1} onEditorStateChange={this.onContent1.bind(this)} toolbar={editorConfig} />
                    </Col>
                    <Col>
                        <ColTitle>После</ColTitle>
                        <Editor editorState={editorState2} onEditorStateChange={this.onContent2.bind(this)} toolbar={editorConfig} />
                    </Col>
                </Row>
                {this.saveButton()}
            </ContentBlock>
        );
    }

    renderView() {
        return (
            <ContentBlock>
                {this.toolBox()}
                <Row>
                    <Col>
                        <ColTitle>До</ColTitle>
                        <div dangerouslySetInnerHTML={{__html: this.getHTMLContent1()}}></div>
                    </Col>
                    <Col>
                        <ColTitle>После</ColTitle>
                        <div dangerouslySetInnerHTML={{__html: this.getHTMLContent2()}}></div>
                    </Col>
                </Row>
            </ContentBlock>
        );
    }
}

export default DoubleColumn;