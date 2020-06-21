import React from 'react'

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import AbstractContentBlock from './AbstractContentBlock'
import ToolBox from '../ToolBox'

import { ContentBlock, UneditableBlock, Icon } from '../styles'
import { faRssSquare } from '@fortawesome/free-solid-svg-icons'

class Subscription extends AbstractContentBlock {

    renderView() {
        return (
            <ContentBlock>
                {this.toolBox({noEdit: true})}
                <UneditableBlock><Icon icon={faRssSquare} fixedWidth /> Блок с формой подписки</UneditableBlock>
            </ContentBlock>
        );
    }
}

export default Subscription;