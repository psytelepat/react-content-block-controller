import React from 'react'
import axios from 'axios'

import AbstractContentBlock from './AbstractContentBlock'
import ToolBox from './ToolBox'
import UploadImage from './UploadImage'

import { ReactSortable } from "react-sortablejs";

class Image extends AbstractContentBlock {

    constructor(props){
        super(props);

        this.state.previews = props.data.previews;
        this.state.images = props.data.images;
        this.state.disableSortable = false;
        this.state.deleteIds = this.fillDeletedIds(false);
        this.state.code = props.data.code;

        this.configureUrls();
    }

    configureUrls() {
        let url = this.props.url + "/" + this.props.data.grp + "/upload/content-block.photo/";
        this.uploadImageURL = url + "upload/formData";
        this.deleteImageURL = url + "delete";
        this.reposImageURL = url + "repos";
    }

    onUploadSuccess(resp) {
        if (resp.data.success) {
            this.props.replaceBlock(this.props.data.grp, resp.data.content);
            this.setState({
                previews: resp.data.content.previews,
                images: resp.data.content.images,
                deleteIds: this.fillDeletedIds(false),
                disableSortable: false,
            });
        }else{
            onUploadError(resp.data.message);
        }
    }

    onUploadError(error) {
        this.setState({ disableSortable: false });
        console.log(error);
    }

    fillDeletedIds(status) {
        let deleteIds = {};
        for (let i in this.state.previews)
            deleteIds[this.state.previews[i].id] = status;
        return deleteIds;
    }

    onToggleAll() {
        let hasSelected = false;
        for (let id in this.state.deleteIds) {
            if (this.state.deleteIds[id]) {
                hasSelected = true;
                break;
            }
        }

        this.setState({ deleteIds: this.fillDeletedIds(!hasSelected) });
    }

    onDelete() {
        let ids = [], self = this;
        for (let id in this.state.deleteIds) {
            if (this.state.deleteIds[id]) {
                ids.push(id);
            }
        }
        axios.post(this.deleteImageURL, {delete: ids.join(',')})
        .then(this.onUploadSuccess.bind(this))
        .catch(this.onUploadError.bind(this));
    }

    onDeleteCheckboxChange(event) {
        let id = event.target.value,
            deleteIds = this.state.deleteIds;
        deleteIds[id] = event.target.checked;
        this.setState({deleteIds: deleteIds});
    }

    onSortableStart() {
        this.previews_snapshot = this.state.previews;
    }

    onSortableEnd(e) {
        let self = this,
            from_id = this.previews_snapshot[e.oldIndex].id,
            to_id = this.previews_snapshot[e.newIndex].id;
        this.setState({ disableSortable: true });
        axios.post(this.reposImageURL + "/" + from_id + "/" + to_id, {from_id: from_id, to_id: to_id})
        .then(function(){ self.setState({ disableSortable: false }); })
        .catch(this.onUploadError.bind(this));
    }

    sortableGallery() {
        return <ReactSortable
            className="image-drag-drop"
            list={this.state.previews}
            setList={newState => this.setState({ previews: newState })}
            group={"content-block-previews"}
            animation={100}
            delayOnTouchStart={true}
            delay={2}
            onStart={this.onSortableStart.bind(this)}
            onEnd={this.onSortableEnd.bind(this)}
            disabled={this.state.disableSortable}
        >
            {this.state.previews.map(item => (
            <div key={item.id} className="item pv" style={{"backgroundImage": "url(" + item.url + ")"}}>
                <input type="checkbox" value={item.id} checked={this.state.deleteIds[item.id]} onChange={this.onDeleteCheckboxChange.bind(this)} />
            </div>))}
        </ReactSortable>
    }

    renderForm() {
        return  (
            <div className="cntBlk image">
                <ToolBox toolBoxHandler={this.toolBoxHandler.bind(this)} />
                <span className="cntBlk imageBlk">
                    <span className="line fileUpload">
                        {this.sortableGallery()}
                        <div className="controls">
                            <span className="select-all" onClick={this.onToggleAll.bind(this)}>Выбырать все</span> | <span className="delete-selected" onClick={this.onDelete.bind(this)}>Удалить</span>
                        </div>
                        <UploadImage uploadURL={this.uploadImageURL} onSuccess={this.onUploadSuccess.bind(this)} onError={this.onUploadError.bind(this)} handle="photo" />
                    </span>
                </span>
                <div className="btn btn-success btn-sm saveBlock" onClick={this.saveBlock.bind(this)}><i className="fa fa-save"></i> сохранить</div>
            </div>
        );
    }

    renderView() {
        const image = this.props.data.images.length ? this.props.data.images[0] : null;
        return (
            <div className="cntBlk image">
                <ToolBox toolBoxHandler={this.toolBoxHandler.bind(this)} />
                <div className="cntBlkImg" style={{width: "700px"}}>
                    {image ? <img src={image.url} /> : "Нет фото"}
                </div>
            </div>
        );
    }

    render() {
        return this.state.isForm ? this.renderForm() : this.renderView();
    }
}

export default Image;