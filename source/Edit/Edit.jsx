/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { binds } from 'fmihel-browser-lib';

export default class Edit extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onChange');
        this.state = {
            value: this.getValue(),
        };
    }

    getValue() {
        const value = this.props.value || this.props.children;
        return value === undefined ? '' : value;
    }

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange({ id: this.props.id, value: e.target.value });
        } else {
            this.setState({ value: e.target.value });
        }
    }

    render() {
        const {
            dim, disabled, visible, placeholder, disable, labelName, readonly, addClass, style, hint,
        } = this.props;

        const value = ((this.props.onChange || readonly) ? this.getValue() : this.state.value);

        let editInputClass = `wd-edit-input${disabled ? ' wd-edit-disabled' : ''}`;
        editInputClass += (readonly ? ' wd-edit-readonly' : '');

        const display = (visible ? 'flex' : 'none');
        const name = (labelName ? { id: labelName } : {});
        const readonlyProp = (readonly ? { readOnly: 'readonly' } : {});
        const inputStyle = {};
        if ('width' in style) inputStyle.width = style.width;
        return (
            <div className='wd-edit-frame' style={{ display, ...style }}>
                <input
                    type='text'
                    onChange = {this.onChange}
                    className={`${editInputClass} ${addClass}`}
                    value={value}
                    disabled={!!disabled}
                    placeholder={placeholder}
                    {...readonlyProp}
                    {...name}
                    style={inputStyle}
                    title={hint}
                />
                {!disable.dim && <div className="wd-edit-dim">{dim}</div>}
            </div>
        );
    }
}
Edit.defaultProps = {
    id: undefined,
    disabled: 0,
    onChange: undefined,
    dim: 'm',
    value: undefined,
    visible: 1,
    placeholder: '',
    readonly: false,
    style: {},
    disable: {
        dim: false,
    },
    addClass: '',
    hint: '',
};
