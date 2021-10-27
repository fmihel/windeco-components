import React from 'react';

export default class ComboBoxItem extends React.Component {
    render() {
        const disabled = this.props.disabled ? { disabled: true } : {};
        return <option id={this.props.id} {...disabled}>{this.props.caption}</option>;
    }
}
