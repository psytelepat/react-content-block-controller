import React from 'react'

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import AbstractContentBlock from './AbstractContentBlock'
import ToolBox from './ToolBox'

class DoubleColumn extends AbstractContentBlock {
    constructor(props) {
        super(props);

        const blocksFromHtml1 = htmlToDraft(props.data.content1||"");
        const { contentBlocks1, entityMap1 } = contentBlocks1;
        const contentState1 = ContentState.createFromBlockArray(contentBlocks1, entityMap1);
        const editorState1 = EditorState.createWithContent(contentState1);

        this.state.content1EditorState = editorState1;

        const blocksFromHtml2 = htmlToDraft(props.data.content2||"");
        const { contentBlocks2, entityMap2 } = contentBlocks2;
        const contentState2 = ContentState.createFromBlockArray(contentBlocks2, entityMap2);
        const editorState2 = EditorState.createWithContent(contentState2);

        this.state.content2EditorState = editorState2;
    }

    getData() {
        return {
            content1: draftToHtml(convertToRaw(this.state.content1EditorState.getCurrentContent())),
            content2: draftToHtml(convertToRaw(this.state.content2EditorState.getCurrentContent())),
        };
    }

    onContent1EditorStateChange(content1EditorState) {
        this.setState({
            content1EditorState,
        });
    }

    onContent1EditorStateChange(content2EditorState) {
        this.setState({
            content2EditorState,
        });
    }

    renderForm() {
        const { content1EditorState, content2EditorState } = this.state;
        return (
            <div className="cntBlk text">
                <span className="cntBlk doucleColumnBlk">
                    <div className="row">

                        <div className="col">
                            <b>До</b>
                            <span class="line cnt">
                                <Editor
                                  editorState={content1EditorState}
                                  onEditorStateChange={this.onContent1EditorStateChange.bind(this)}
                                />
                            </span>
                        </div>

                        <div className="col">
                            <b>После</b>
                            <span className="line cnt">
                                <Editor
                                  editorState={content2EditorState}
                                  onEditorStateChange={this.onContent2EditorStateChange.bind(this)}
                                />
                            </span>
                        </div>

                    </div>
                </span>
                <div className="btn btn-success btn-sm saveBlock" onClick={this.saveBlock}><i className="fa fa-save"></i> сохранить</div>
            </div>
        );
    }

    renderView() {
        const { content1EditorState, content2EditorState } = this.state;
        return (
            <div className="cntBlk double-column">
                <ToolBox toolBoxHandler={this.toolBoxHandler} />
                <div className="row">
                    <div className="col">
                        <b>До</b>
                        <div dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(content1EditorState.getCurrentContent()))}}></div>
                    </div>
                    <div className="col">
                        <b>После</b>
                        <div dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(content2EditorState.getCurrentContent()))}}></div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this.state.isForm ? this.renderForm() : this.renderView();
    }
}

export default Text;