import React from 'react'

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import ToolBox from '../ToolBox'
import { IconedButton } from '../styles'

class AbstractContentBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isForm: ( typeof this.props.data.__justCreated != 'undefined' && this.props.data.__justCreated ),
            isLoading: false,
        };
    }

    toolBoxHandler(action) {
        switch (action) {
            case "reload":
            case "edit":
            case "delete":
                this[action + "Block"]();
            break;
        }
    }

    turnContentToEditorState(content) {
        const blocksFromHtml = htmlToDraft(content||"");
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
    }

    toolBox(props) {
        return <ToolBox toolBoxHandler={this.toolBoxHandler.bind(this)} noEdit={this.state.isForm} {...props} />
    }

    saveButton() {
        return <IconedButton name="сохранить" icon="save" buttonColor="success" buttonSize="sm" onClick={this.saveBlock.bind(this)} />
    }

    reloadBlock() {
        this.props.reloadBlock(this.props.data.grp)
    }

    saveBlock() {
        if (this.state.isLoading) return;
        var self = this;
        this.setState({ isLoading: true })
        this.props.saveBlock(this.props.data.grp, this.getData(), () => self.setState({
            isForm: false,
            isLoading: false,
            content: self.props.data.content,
        }))
    }

    getData() {
        return {}
    }

    editBlock() {
        this.setState({ isForm: true })
    }

    deleteBlock() {
        this.props.deleteBlock(this.props.data.grp)
    }

    renderView() {
        return null;
    }

    renderForm() {
        return this.renderView();
    }

    render() {
        return this.state.isForm ? this.renderForm() : this.renderView();
    }
}

export default AbstractContentBlock