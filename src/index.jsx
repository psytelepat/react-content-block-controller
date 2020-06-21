import React from 'react'
import ReactDOM from 'react-dom'
import ContentBlockController from './Controller'
const createContentBlockController = function(element) {
    ReactDOM.render(<ContentBlockController trg={ element.getAttribute("trg") } usr={ element.getAttribute("usr") } url={ element.getAttribute("url") } />, element)
}
module.exports = createContentBlockController;