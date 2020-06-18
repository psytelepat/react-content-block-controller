import React from 'react'

class AbstractContentBlock extends React.Component {
    constructor(props) {
        super(props);

        this.saveBlock = this.saveBlock.bind(this);
        this.toolBoxHandler = this.toolBoxHandler.bind(this);
        
        this.state = {
            isForm: false,
            isSaving: false,
        };
    }

    toolBoxHandler(action) {
        switch (action) {
            case 'reload':
                this.reloadBlock();
            break;
            case 'edit':
                this.editBlock();
            break;
            case 'move':
                // TODO
            break;
            case 'delete':
                this.deleteBlock();
            break;
        }
    }

    reloadBlock() {
        this.props.reloadBlock(this.props.data.grp);
    }

    saveBlock() {
        if (this.state.isSaving) return;
        var self = this;
        this.setState({ isSaving: true });
        this.props.saveBlock(this.props.data.grp, this.getData(), () => self.setState({
            isForm: false,
            isSaving: false,
            content: self.props.data.content,
        }));
    }

    getData() {
        return {};
    }

    editBlock() {
        this.setState({ isForm: true });
    }

    deleteBlock() {
        this.props.deleteBlock(this.props.data.grp);
    }
}

export default AbstractContentBlock