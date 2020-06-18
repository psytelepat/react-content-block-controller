import React from 'react'

import AddButton from './AddButton'

class AddButtons extends React.Component {
    render() {
        var items = [];
        for (var id in this.props.modes) {
            var { tid, name, icon } = this.props.modes[id];
            items.push(<AddButton key={id} id={id} name={name} icon={icon} createBlock={this.props.createBlock} />);
        }
        return (
            <div className="addButtons">
                {items}
            </div>
        );
    }
}

export default AddButtons;