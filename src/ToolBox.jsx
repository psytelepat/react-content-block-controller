import React from 'react'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faPencilAlt, faArrowsAltV, faTrash } from '@fortawesome/free-solid-svg-icons'

import { Tool, Icon } from './styles'

class ToolBox extends React.Component {
    render() {
        return (
            <Tool>
                {this.props.withReload && <Icon icon={faSyncAlt} fixedWidth onClick={() => this.props.toolBoxHandler('reload')} />}
                {!this.props.noEdit && <Icon icon={faPencilAlt} fixedWidth onClick={() => this.props.toolBoxHandler('edit')} />}
                <Icon icon={faArrowsAltV} className="js-repos-handle" fixedWidth onClick={() => this.props.toolBoxHandler('move')} />
                <Icon icon={faTrash} fixedWidth onClick={() => this.props.toolBoxHandler('delete')} />
            </Tool>
        );
    }
}

export default ToolBox;