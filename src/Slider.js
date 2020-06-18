import React from 'react'

import Image from './Image'
import ToolBox from './ToolBox'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Slider extends Image {

    configureUrls() {
        let url = this.props.url + "/" + this.props.data.grp + "/upload/content-block.gallery/";
        this.uploadImageURL = url + "upload/formData";
        this.deleteImageURL = url + "delete";
        this.reposImageURL = url + "repos";
    }

    renderView() {
        return (
            <div className="cntBlk gallery">
                <ToolBox toolBoxHandler={this.toolBoxHandler.bind(this)} />
                <Carousel width="700px" showThumbs={false} swipeable={true} dynamicHeight={true} centerSlidePercentage={80} emulateTouch={true}>
                    {this.props.data.images.map(image => <div key={image.id}><img src={image.url} /></div>)}
                </Carousel>
            </div>
        );
    }
}

export default Slider;