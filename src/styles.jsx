import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faTh, faCamera, faAlignLeft, faRssSquare, faColumns, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faSave);
library.add(faTh);
library.add(faCamera);
library.add(faAlignLeft);
library.add(faRssSquare);
library.add(faColumns);
library.add(faTimes);

export const ContentBlock = styled.div`
    position: relative;
    padding: 8px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 1.57em;
    width: 100%;
    max-width: 720px;
`

export const UploadGalleryBox = styled.div`
    position: relative;
    padding: 10px;
    border: 1px #efefef solid;

    nav.react-contextmenu {
        background-color: #ffffff;

        div.react-contextmenu-item {
            font-size: 12px;
            cursor: pointer;
            padding: 4px 10px;
            border-top: 1px #efefef solid;
            &:first-of-type {
                border-top: 0px;
            }
            &:hover {
                background-color: #efefef;
            }
        }
    }
`

export const UploadGalleryControls = styled.div`
    position: relative;
    padding: 0px 0 20px 0;
    color: #333333;
    & > span {
        font-size: 12px;
        line-height: 1em;
        border-bottom: 1px #333333 dashed;
        transition: color .25s ease, border-color .25s ease;
        cursor: pointer;
        &:hover {
            border-bottom-color: transparent;
            color: #000000;
        }
    }
`

export const ImageView = styled.img`
    width: 100%;
    height: auto;
`

export const UneditableBlock = styled.div`
    padding: 30px;
    background-color: #efefef;
    border: 1px #cccccc solid;
    border-radius: 4px;
    text-align: center;
`

export const Tool = styled.div`
    position: absolute;
    top: 0px;
    left: -20px;
    transform: translateX(-100%);
    padding: 4px 10px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px #ccc solid;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    z-index: 1000;
`

export const Icon = styled(FontAwesomeIcon)`
    cursor: pointer;
    margin-right: 5px;
    color: #666666;
    transition: color .5s ease;
    &:last-child {
        margin-right: 0;
    }
    &:hover {
        color:#000000;
    }
`

export const IconWhite = styled(FontAwesomeIcon)`
    cursor: pointer;
    margin-right: 5px;
    color: #ffffff;
    transition: color .5s ease;
    &:last-child {
        margin-right: 0;
    }
    &:hover {
        color:#efefef;
    }
`

export const editorConfig = {
  options: ['inline', 'blockType', 'list', 'textAlign', 'link', ],
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
  },
};

export function LabeledInput(props) {
    return (
        <div className="form-group row">
            <label className="control-label col-lg-2 col-sm-4">{props.title}</label>
            <div className="col-lg-10 col-sm-8">
                <input type="text" className="form-control" value={props.value} onChange={props.onChange} />
            </div>
        </div>
    );
}

export const Btn = styled.div`
    position: relative;
    margin-top: 20px;
    cursor: pointer;
    margin-right: 6px;
`

export function IconedButton(props) {
    return (
        <Btn className={"btn btn-" + (props.buttonColor || "default") + " btn-"+(props.buttonSize || "xs")} onClick={props.onClick}>
            {props.icon ? <IconWhite icon={props.icon} fixedWidth /> : null }
            {props.name && <span>{props.name}</span>}
        </Btn>
    );
}


export const ModalForm = styled.div`
    padding-top: 20px;
`

export const CloseBtn = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    z-index: 10;
`

export function ModalCloseButton(props) {
    return (
        <CloseBtn onClick={props.onClick}><Icon icon={faTimes} fixedWidth /></CloseBtn>
    );
}