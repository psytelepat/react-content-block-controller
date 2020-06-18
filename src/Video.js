import React from 'react'

import AbstractContentBlock from './AbstractContentBlock'
import ToolBox from './ToolBox'

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

    onChange(event) {
        this.setState({
            code: event.target.value,
        });
    }

    render() {
        let view;
        if (this.state.isForm) {
            view = (
                <div className="cntBlk video">
                    <span className="cntBlk videoBlk">
                        <span className="line cnt">
                            <textarea className="code-fld" onChange={this.onChange.bind(this)} value={this.state.code} />
                        </span>
                    </span>
                    <div className="btn btn-success btn-sm saveBlock" onClick={this.saveBlock}><i className="fa fa-save"></i> сохранить</div>
                </div>
            );
        } else {
            view = <div className="cntBlk video">
                <ToolBox toolBoxHandler={this.toolBoxHandler} />
                <span className="cntBlk videoBlk" dangerouslySetInnerHTML={{__html: this.state.code}}>
                </span>
            </div>
        }

        return view;
    }
}

export default Video;