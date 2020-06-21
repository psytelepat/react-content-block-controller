import React from 'react'
import axios from 'axios'

import Modal from 'react-modal'

import UploadImage from './UploadImage'
import ImageDataEditor from './ImageDataEditor'

import { ReactSortable } from "react-sortablejs";
import { ContentBlock, UploadGalleryBox, UploadGalleryControls, ImageView } from './styles'

const imageDataEditorModalStyles = {
    overlay: {
        zIndex: 10000,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        minWidth: '600px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

import styled from '@emotion/styled'

const PreviewImage = styled.div`
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 4px;

    background: {
        position: center center;
        repeat: no-repeat;
        size: cover;
    }

    input[type="checkbox"] {
      position: absolute;
      top: 5px;
      left: 5px;
    }
`

class UploadGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previews: props.previews,
            disableSortable: false,
            editingImageId: null
        };

        this.state.deleteIds = this.fillDeletedIds(false);
    }

    onUploadSuccess(resp) {
        if (resp.data.success) {
            this.setState({
                disableSortable: false,
                deleteIds: this.fillDeletedIds(false),
                previews: resp.data.content.previews,
            });

            if (typeof this.props.onUpload == 'function') {
                this.props.onUpload(resp);
            }
        }else{
            this.onUploadError(resp.data.message);
        }
    }

    onUploadError(error) {
        this.setState({ disableSortable: false });
    }

    onClick(event) {
        if (event.ctrlKey) {
            this.setState({editingImageId: event.target.getAttribute('name')});
        }
    }

    onCloseEditModal() {
        this.setState({editingImageId: null});
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
        axios.post(this.props.deleteURL, {delete: ids.join(',')})
        .then(this.onUploadSuccess.bind(this))
        .catch(this.onUploadError.bind(this));
    }

    fillDeletedIds(status) {
        let deleteIds = {};
        for (let i = 0; i < this.state.previews.length; i++)
            deleteIds[this.state.previews[i].id] = status;
        return deleteIds;
    }

    onDeleteCheckboxChange(event) {
        let id = event.target.name,
            deleteIds = {};
        for (let i in this.state.deleteIds) {
            deleteIds[i] = this.state.deleteIds[i];
        }
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
        if (from_id == to_id)
            return;
        this.setState({ disableSortable: true });
        axios.post(this.props.reposURL + "/" + from_id + "/" + to_id, {from_id: from_id, to_id: to_id})
        .then(function(){ self.setState({ disableSortable: false }); })
        .catch(this.onUploadError.bind(this));
    }

    sortableGallery() {
        return <ReactSortable
            list={this.state.previews}
            setList={newState => this.setState({ previews: newState })}
            animation={100}
            delayOnTouchStart={true}
            delay={2}
            onStart={this.onSortableStart.bind(this)}
            onEnd={this.onSortableEnd.bind(this)}
            disabled={this.state.disableSortable}
        >
            {this.state.previews.map(item => (
            <PreviewImage key={item.id} name={item.id} style={{backgroundImage: "url(" + item.url + ")"}} onClick={this.onClick.bind(this)}>
                <input type="checkbox" name={item.id} checked={this.state.deleteIds[item.id]} onChange={this.onDeleteCheckboxChange.bind(this)} />
            </PreviewImage>))}
        </ReactSortable>
    }

    render() {
        const hasImages = this.props.previews.length > 0;
        const { editingImageId } = this.state;
        return (
            <UploadGalleryBox>
                <Modal
                    isOpen={!!editingImageId}
                    style={imageDataEditorModalStyles}
                    shouldCloseOnEsc={true}
                >
                    {editingImageId && <ImageDataEditor key={editingImageId} url={this.props.editURL+"/"+editingImageId} onClose={this.onCloseEditModal.bind(this)} />}
                </Modal>
                {hasImages && this.sortableGallery()}
                {hasImages && (
                    <UploadGalleryControls>
                        <span onClick={this.onToggleAll.bind(this)}>Выбрать все</span> | <span onClick={this.onDelete.bind(this)}>Удалить</span>
                    </UploadGalleryControls>
                )}
                <UploadImage handle={this.props.handle} uploadURL={this.props.uploadURL} onSuccess={this.onUploadSuccess.bind(this)} onError={this.onUploadError.bind(this)} />
            </UploadGalleryBox>
        );
    }
}

export default UploadGallery