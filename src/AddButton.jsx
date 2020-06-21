import React from 'react'
import styled from '@emotion/styled'

const Btn = styled.div`
    margin-right: 6px;
`

class AddButton extends React.Component {
    render() {
        return (
            <Btn className="btn btn-primary btn-xs" onClick={() => this.props.createBlock(this.props.id)}>
                { this.props.icon ? <i className={"fa "+this.props.icon}></i> : null }
                &nbsp;<span>{this.props.name}</span>
            </Btn>
        );
    }
}

export default AddButton;