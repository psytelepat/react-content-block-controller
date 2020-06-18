import React from 'react'
import axios from 'axios'

class UploadImage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isUploading: false,
            selectedFiles: null,
            progress: 0
        };
    }

    onFileChange(event) {
        this.setState({ selectedFiles: event.target.files }, this.onFileUpload.bind(this));
    }

    onFileUpload() {
        var self = this;

        const config = {
            onUploadProgress: progressEvent => self.setState({ progress: Math.round((progressEvent.loaded * 100) / progressEvent.total) }),
        }

        const formData = new FormData();

        for (let i = 0; i < this.state.selectedFiles.length; i++) {
            formData.append(
                this.props.handle+"["+i+"]", 
                this.state.selectedFiles[i], 
                this.state.selectedFiles[i].name,
            );
        }

        this.setState({ isUploading: true, progress: 0 });

        axios.post(this.props.uploadURL, formData, config)
        .then(resp => {
            self.setState({ isUploading: false });
            (typeof self.props.onSuccess == 'function') && self.props.onSuccess(resp);
        }).catch(error => {
            self.setState({ isUploading: false });
            (typeof self.props.onError == 'function') && self.props.onError(error);
        });
    };

    render() {
        const { isUploading, progress } = this.state;
        return (
            <div className="file-upload">
                <div className="file-upload-field">
                    <div className="caption" style={{ opacity: isUploading ? 0 : 1, }}>Загрузить файлы...</div>
                    <input type="file" multiple={true} onChange={this.onFileChange.bind(this)} />
                    <div className="bar" style={{ display: isUploading ? 'block' : 'none', width: isUploading ? progress + "%" : 0 }}></div>
                    <div className="prc" style={{ display: isUploading ? 'block' : 'none', }}>{isUploading ? progress + "%" : null}</div>
                </div>
            </div>
        );
    }
}


export default UploadImage;