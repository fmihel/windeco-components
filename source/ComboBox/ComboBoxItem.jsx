import React from 'react';

export default class ComboBoxItem extends React.Component {
    render() {
        const disabled = this.props.disabled ? { disabled: true } : {};
        return <option value = {this.props.id} {...disabled}>{this.props.children}</option>;
    }
}
