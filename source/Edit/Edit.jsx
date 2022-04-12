/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ut } from 'fmihel-browser-lib';

export default class Edit extends React.Component {
    constructor(p) {
        super(p);

        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
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

    onKeyPress(o) {
        if (this.props.onKeyPress) {
            this.props.onKeyPress({
                id: this.props.id,
                value: o.target.value,
                key: o.key,
                args: o,
            });
        }
    }

    render() {
        const {
            dim, placeholder, disable, labelName, addClass, style, hint, type, required,
        } = this.props;
        const disabled = ut.toBool(this.props.disabled);
        const visible = ut.toBool(this.props.visible);
        const readonly = ut.toBool(this.props.readonly);

        const value = ((this.props.onChange || readonly) ? this.getValue() : this.state.value);

        let editInputClass = `wd-edit-input${disabled ? ' wd-edit-disabled' : ''}`;
        editInputClass += (readonly ? ' wd-edit-readonly' : '');
        if (required && (`${value}`).length === 0) editInputClass += ' wd-edit-require ';

        const display = (visible ? 'flex' : 'none');
        const name = (labelName ? { id: labelName } : {});
        const readonlyProp = (readonly ? { readOnly: 'readonly' } : {});
        const inputStyle = {};
        if ('width' in style) inputStyle.width = style.width;
        if ('textAlign' in style) inputStyle.textAlign = style.textAlign;

        return (
            <div className='wd-edit-frame' style={{ display, ...style }}>
                <input
                    ref = {this.inputRef}
                    type={type || 'text'}
                    onChange = {this.onChange}
                    onKeyPress={this.onKeyPress}
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
    type: 'text',
    disabled: 0,
    onChange: undefined,
    onKeyPress: undefined,
    dim: 'm',
    value: undefined,
    visible: 1,
    placeholder: '',
    readonly: false,
    required: false,
    style: {},
    disable: {
        dim: false,
    },
    addClass: '',
    hint: '',
};
