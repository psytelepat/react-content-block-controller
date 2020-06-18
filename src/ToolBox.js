import React from 'react'

class ToolBox extends React.Component {
    render() {
        return (
            <div className="tool">
                <div className="fa fa-sync-alt" title="обновить" onClick={() => this.props.toolBoxHandler('reload')} />
                <div className="fa fa-pencil-alt" title="редактировать" onClick={() => this.props.toolBoxHandler('edit')} />
                <div className="fa fa-arrows-alt js-repos-handle" title="переместить" onClick={() => this.props.toolBoxHandler('move')} />
                <div className="fa fa-times" title="удалить" onClick={() => this.props.toolBoxHandler('delete')} />
            </div>
        );
    }
}

export default ToolBox;