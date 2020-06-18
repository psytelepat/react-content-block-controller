import React from 'react'
import axios from 'axios'

import AddButtons from './AddButtons'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { ReactSortable } from "react-sortablejs";

import Text from './Text'
import Image from './Image'
import Slider from './Slider'
import Video from './Video'
import Quote from './Quote'
import Subscription from './Subscription'
import PublicatorForm from './PublicatorForm'

class Controller extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            loaded: false,
            error: false,
            config: false,
            content: false,
            disableSortable: false,
        };

        this.url = props.url + "/" + props.trg + "/" + props.usr;

        this.createBlock = this.createBlock.bind(this);
        this.reloadBlock = this.reloadBlock.bind(this);
        this.saveBlock = this.saveBlock.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
    }

    createBlock(mode) {
        fetch(this.url + "/create/" + mode, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(
            (resp) => {
                this.setState(state => ({ content: [...state.content, resp.content] }))
            },
            (error) => {
                this.setState({
                    loaded: false,
                    error: error,
                });
            }
        );
    }

    replaceBlock(grp, content) {
        this.setState({ content: this.state.content.map(block => (block.grp == grp) ? content : block ) });
    }

    reloadBlock(grp, callback) {
        let self = this;
        fetch(this.url + "/" + grp, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .then(
            (resp) => {
                self.replaceBlock(grp,resp.content);
                (typeof callback == 'function') && callback();
            },
            (error) => {
                console.log(error);
                (typeof callback == 'function') && callback();
            }
        );
    }

    saveBlock(grp, data, callback) {
        var self = this;
        data._token = document.getElementsByName('csrf-token')[0].getAttribute('content');
        fetch(this.url + "/" + grp + "/edit", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(
            (resp) => {
                self.replaceBlock(grp,resp.content);
                (typeof callback == 'function') && callback();
            },
            (error) => {
                console.log(error);
                (typeof callback == 'function') && callback();
            }
        );
    }

    deleteBlock(grp) {
        if (confirm('Удалить блок?')) {
            fetch(this.url + "/" + grp + "/delete", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _token: document.getElementsByName('csrf-token')[0].getAttribute('content')
                })
            })
            .then(resp => resp.json())
            .then(
                (resp) => {
                    this.setState(state => ({ content : state.content.filter(item => item.grp != grp) }));
                },
                (error) => {
                    alert('Ошибка удаления блока.')
                }
            );
        }
    }

    componentDidMount(){
        fetch(this.url + "/json", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .then(
            (resp) => {
                this.setState({
                    loaded: true,
                    config: resp.config,
                    content: resp.content,
                });
            },
            (error) => {
                this.setState({
                    loaded: false,
                    error: error,
                });
            }
        )
    }

    onSortableStart() {
        this.content_snapshot = this.state.content;
    }

    onSortableEnd(e) {
        let self = this,
            from_id = this.content_snapshot[e.oldIndex].grp,
            to_id = this.content_snapshot[e.newIndex].grp;
        this.setState({ disableSortable: true });
        axios.post(this.url + "/" + from_id + "/repos/" + to_id, {from_id: from_id, to_id: to_id})
        .then(function(){ self.setState({ disableSortable: false }); })
        .catch(function(error){
            self.setState({ disableSortable: false });
            alert(error);
        });
    }

    render() {
        let blocks, buttons;
        if (this.state.loaded) {
            blocks = <ReactSortable
                    list={this.state.content}
                    setList={newState => this.setState({ content: newState })}
                    group="content-blocks"
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

            buttons = <AddButtons modes={this.state.config.block_modes} createBlock={this.createBlock.bind(this)} />;
        } else {
            blocks = "Loading...";
            buttons = null;
        }

        return (
            <div>
                {blocks}                
                {buttons}
            </div>
        );
    }
}

export default Controller;