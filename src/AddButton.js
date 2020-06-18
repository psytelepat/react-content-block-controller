import React from 'react'

class AddButton extends React.Component {
    render() {
        return (
            <div className="btn btn-primary btn-xs addButton" onClick={() => this.props.createBlock(this.props.id)}>
                { this.props.icon ? <i className={"fa "+this.props.icon}></i> : null }
                &nbsp;<span>{this.props.name}</span>
            </div>
        );
    }
}

export default AddButton;