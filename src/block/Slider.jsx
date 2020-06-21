import React from 'react'

import Image from './Image'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { ContentBlock } from '../styles'

class Slider extends Image {

    constructor(props) {
        super(props);
        this.imageUploadHandle = "gallery";
        this.uploadGalleryURLBase = this.props.url + "/" + this.props.data.grp + "/upload/content-block." + this.imageUploadHandle + "/";
    }

    renderView() {
        return (
            <ContentBlock>
                {this.toolBox()}
                <Carousel width="700px" showThumbs={false} swipeable={true} dynamicHeight={true} centerSlidePercentage={80} emulateTouch={true}>
                    {this.props.data.images.map(image => <div key={image.id}><img src={image.url} /></div>)}
                </Carousel>
            </ContentBlock>
        );
    }
}

export default Slider;