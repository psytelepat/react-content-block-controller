import React from 'react'

import AbstractContentBlock from './AbstractContentBlock'

import { ContentBlock } from '../styles'

import styled from '@emotion/styled'

export const VideoCode = styled.textarea`
    border: 1px #000 solid;
    width: 100%;
    max-width: 700px;
    height: 200px;
`

class Video extends AbstractContentBlock {

    constructor(props){
        super(props);
        this.state.code = props.data.code;
    }

    getData() {
        return {
            code: this.state.code,
        };
    }

    processedVideoCode() {
        return this.state.code;
    }

    onChange(event) {
        this.setState({
            code: event.target.value,
        });
    }

    renderForm() {
        return (
            <ContentBlock editor>
                {this.toolBox()}
                <VideoCode onChange={this.onChange.bind(this)} value={this.state.code} />
                {this.saveButton()}
            </ContentBlock>
        );
    }

    renderView() {
        return (
            <ContentBlock>
                {this.toolBox()}
                <div dangerouslySetInnerHTML={{__html: this.processedVideoCode()}} />
            </ContentBlock>
        );
    }
}

export default Video;