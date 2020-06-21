import React from 'react'

import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import AbstractContentBlock from './AbstractContentBlock'

import { ContentBlock, UneditableBlock, Icon } from '../styles'
import { faRssSquare } from '@fortawesome/free-solid-svg-icons'

class PublicatorForm extends AbstractContentBlock {

    renderView() {
        return (
            <ContentBlock>
                {this.toolBox({noEdit: true})}
                <UneditableBlock><Icon icon={faRssSquare} fixedWidth /> Блок с формой обратной связи</UneditableBlock>
            </ContentBlock>
        );
    }
}

export default PublicatorForm;