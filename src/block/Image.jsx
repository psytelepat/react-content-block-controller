import React from 'react'

import AbstractContentBlock from './AbstractContentBlock'
import UploadGallery from '../UploadGallery'

import { ContentBlock, ImageView } from '../styles'

class Image extends AbstractContentBlock {

    constructor(props){
        super(props);
        this.imageUploadHandle = "photo";
        this.uploadGalleryURLBase = this.props.url + "/" + this.props.data.grp + "/upload/content-block.photo/";
    }

    onUpload(resp) {
        resp.data.success && this.props.replaceBlock(this.props.data.grp, resp.data.content);
    }

    renderForm() {
        return (
            <ContentBlock editor>
                {this.toolBox()}
                <UploadGallery
                    id={"gallery-"+this.props.data.grp}
                    handle={this.imageUploadHandle}
                    baseURL={this.uploadGalleryURLBase}
                    onUpload={this.onUpload.bind(this)}
                    previews={this.props.data.previews}
                />
                {this.saveButton()}
            </ContentBlock>
        );
    }

    renderView() {
        const image = this.props.data.images.length ? this.props.data.images[0] : null;
        return (
            <ContentBlock>
                {this.toolBox()}
                {image ? <ImageView src={image.url} /> : "Нет фото"}
            </ContentBlock>
        );
    }
}

export default Image;