import React from 'react'
import { IconedButton } from './styles'

class AddButtons extends React.Component {
    render() {
        var items = [];
        for (var id in this.props.modes) {
            var { tid, name, icon } = this.props.modes[id];
            items.push(((id) => <IconedButton key={id} id={id} name={name} buttonColor="primary" icon={icon} onClick={() => this.props.createBlock(id)} />)(id));
        }
        return (
            <div>
                {items}
            </div>
        );
    }
}

export default AddButtons;