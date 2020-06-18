import React from 'react'

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import AbstractContentBlock from './AbstractContentBlock'
import ToolBox from './ToolBox'

class Subscription extends AbstractContentBlock {

    render() {
        return (
            <div className="cntBlk text">
                <ToolBox toolBoxHandler={this.toolBoxHandler.bind(this)} />
                <span className="cntBlk quoteBlk" style={{padding: "30px", backgroundColor: "#efefef", border: "1px #666 solid", textAlign: "center"}}>
                    <i className="fa fa-rss-square"></i> Блок с формой подписки
                </span>
            </div>
        );
    }
}

export default Subscription;