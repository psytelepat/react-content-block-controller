import React from 'react'
import ReactDOM from 'react-dom'
import ContentBlockController from './Controller'
import UploadGallery from './UploadGallery'

export const createContentBlockController = function(element) {
    ReactDOM.render(<ContentBlockController trg={ element.getAttribute("trg") } usr={ element.getAttribute("usr") } url={ element.getAttribute("url") } />, element)
}

export const createUploadGallery = function(element) {
    ReactDOM.render(<UploadGallery id={element.getAttribute("data-id")} handle={element.getAttribute("data-handle")} baseURL={element.getAttribute("data-base-url")} />, element)   
}

module.exports = {
    ContentBlockController: createContentBlockController,
    UploadGallery: createUploadGallery,
};

export default createContentBlockController;