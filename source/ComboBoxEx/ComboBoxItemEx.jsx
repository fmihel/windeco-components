import { binds } from 'fmihel-browser-lib';
import React from 'react';

export default class ComboBoxItemEx extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onClick');
    }

    onClick() {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick({ sender: this, data: this.props.data });
        }
    }

    render() {
        const {
            caption, id, addClass, disabled, mark, style,
        } = this.props;
        return (
            <div
                className={`wd-combobox-ex-item ${mark ? ' wd-combobox-ex-item-mark' : ''} ${disabled ? ' wd-combobox-ex-item-disabled' : ''} ${addClass}`}
                id={id}
                onClick={this.onClick}
                title={caption}
                style={style}
            >
                {caption}
            </div>
        );
    }
}
ComboBoxItemEx.defaultProps = {
    disabled: false,
    caption: '',
    addClass: '',
    style: {},
    id: undefined,
    onClick: undefined,
    data: undefined,
    mark: false,

};
