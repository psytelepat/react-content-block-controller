import React from 'react'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement(document.body);

import AddButtons from './AddButtons'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { ReactSortable } from "react-sortablejs";

import Text from './block/Text'
import Image from './block/Image'
import Slider from './block/Slider'
import Video from './block/Video'
import Quote from './block/Quote'
import DoubleColumn from './block/DoubleColumn'
import Subscription from './block/Subscription'
import PublicatorForm from './block/PublicatorForm'

class Controller extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            isLoaded: false,
            error: false,
            config: false,
            content: false,
            disableSortable: false,
        };

        this.url = props.url + "/" + props.trg + "/" + props.usr;
        this.requestHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    createBlock(mode) {
        fetch(this.url + "/create/" + mode, {headers: this.requestHeaders,})
        .then(resp => resp.json())
        .then(
            (resp) => {
                resp.content.__justCreated = true;
                this.setState(state => ({ content: [...state.content, resp.content] }))
            },
            (error) => {
                this.setState({
                    isLoaded: false,
                    error: error,
                });
                this.onError(error)
            }
        );
    }

    replaceBlock(grp, content) {
        this.setState({ content: this.state.content.map(block => (block.grp == grp) ? content : block ) })
    }

    reloadBlock(grp, callback) {
        fetch(this.url + "/" + grp, {headers: this.requestHeaders,})
        .then(resp => resp.json())
        .then(
            (resp) => {
                this.replaceBlock(grp,resp.content);
                (typeof callback == 'function') && callback(resp)
            },
            (error) => {
                this.onError(error)
            }
        );
    }

    onError(error) {

    }

    saveBlock(grp, data, callback) {
        data._token = document.getElementsByName('csrf-token')[0].getAttribute('content');
        
        fetch(this.url + "/" + grp + "/edit", {
            method: 'POST',
            headers: this.requestHeaders,
            body: JSON.stringify(data),
        })
        .then(resp => resp.json())
        .then(
            (resp) => {
                this.replaceBlock(grp,resp.content);
                (typeof callback == 'function') && callback(resp)
            },
            (error) => {
                this.onError(error)
            }
        );
    }

    deleteBlock(grp, callback) {
        if (confirm('Удалить блок?')) {
            fetch(this.url + "/" + grp + "/delete", {
                method: 'POST',
                headers: this.requestHeaders,
                body: JSON.stringify({ _token: document.getElementsByName('csrf-token')[0].getAttribute('content') }),
            })
            .then(resp => resp.json())
            .then(
                (resp) => {
                    this.setState(state => ({ content : state.content.filter(item => item.grp != grp) }))
                },
                (error) => {
                    this.onError(error)
                }
            );
        }
    }

    fetchData(callback) {
        fetch(this.url + "/json",{headers: this.requestHeaders,})
        .then(resp => resp.json())
        .then(
            (resp) => {
                this.setState({
                    isLoaded: true,
                    config: resp.config,
                    content: resp.content,
                    isLoading: false,
                });
                (typeof callback == 'function') && callback(resp)
            },
            (error) => {
                this.onError(error)
            }
        )
    }

    componentDidMount(){
        this.setState({isLoading: true}, this.fetchData())
    }

    onSortableStart() {
        this.content_snapshot = this.state.content
    }

    onSortableEnd(e) {
        let self = this,
            from_id = this.content_snapshot[e.oldIndex].grp,
            to_id = this.content_snapshot[e.newIndex].grp;
        
        if (from_id == to_id)
            return;

        this.setState({ disableSortable: true });

        axios.post(this.url + "/" + from_id + "/repos/" + to_id, {from_id: from_id, to_id: to_id})
        .then(function(){ self.setState({ disableSortable: false }) })
        .catch(function(error){
            self.setState({ disableSortable: false })
        });
    }

    render() {
        let blocks, buttons;
        if (this.state.isLoaded) {
            blocks = <ReactSortable
                    list={this.state.content}
                    setList={newState => this.setState({ content: newState })}
                    animation={100}
                    delayOnTouchStart={true}
                    delay={2}
                    handle=".js-repos-handle"
                    onStart={this.onSortableStart.bind(this)}
                    onEnd={this.onSortableEnd.bind(this)}
                    disabled={this.state.disableSortable}
                >
                    {this.state.content.map((data) => {
                        var Block;
                        switch (data.mode) {
                            case 2:Block = Image;break;
                            case 3:Block = Slider;break;
                            case 4:Block = Video;break;
                            case 5:Block = Quote;break;
                            case 6:Block = Subscription;break;
                            case 7:Block = DoubleColumn;break;
                            case 8:Block = PublicatorForm;break;
                            default:Block = Text;break;
                        }
                        return <Block key={data.grp} url={this.url} data={data} reloadBlock={this.reloadBlock.bind(this)} replaceBlock={this.replaceBlock.bind(this)} saveBlock={this.saveBlock.bind(this)} deleteBlock={this.deleteBlock.bind(this)} />;
                    })}
                </ReactSortable>

            buttons = <AddButtons modes={this.state.config.block_modes} createBlock={this.createBlock.bind(this)} />
        } else {
            blocks = "Loading..."
            buttons = null
        }

        return (
            <div style={{marginTop: "40px"}}>
                {blocks}
                {buttons}
            </div>
        );
    }
}

export default Controller;