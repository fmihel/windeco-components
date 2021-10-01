/* eslint-disable import/no-extraneous-dependencies */
import './Edit.scss';
import React from 'react';
import { binds } from 'fmihel-browser-lib';

export default class Edit extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onChange');
        this.state = {
            value: (this.props.value !== undefined ? this.props.value : this.props.children),
        };
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
            dim, disabled, visible, placeholder, disable, labelName, readonly,
        } = this.props;

        const propsValue = (this.props.value !== undefined ? this.props.value : this.props.children);
        const value = ((this.props.onChange || readonly) ? propsValue : this.state.value);

        let editInputClass = `wd-edit-input${disabled ? ' wd-edit-disabled' : ''}`;
        editInputClass += (readonly ? ' wd-edit-readonly' : '');

        const display = (visible ? 'flex' : 'none');
        const name = (labelName ? { id: labelName } : {});
        const readonlyProp = (readonly ? { readOnly: 'readonly' } : {});
        return (
            <div className='wd-edit-frame' style={{ display }}>
                <input
                    type='text'
                    onChange = {this.onChange}
                    className={editInputClass}
                    value={value}
                    disabled={!!disabled}
                    placeholder={placeholder}
                    {...readonlyProp}
                    {...name}
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
    disable: {
        dim: false,
    },
};
