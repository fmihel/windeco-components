/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { binds } from 'fmihel-browser-lib';

export default class Edit extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onChange');
        this.state = {
            value: this.props.value,
        };
    }

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange({ id: this.props.id, value: e.target.value });
        }/* else {
            this.setState({ id: this.props.id, value: e.target.value });
        } */
    }

    render() {
        const {
            dim, disabled, visible, placeholder, disable,
        } = this.props;
        // const value = this.props.onChange ? this.props.value : this.state.value;
        // const { value } = this.props;
        const value = this.props.value !== undefined ? this.props.value : this.props.children;
        const editInputClass = `wd-edit-input${disabled ? ' wd-edit-disabled' : ''}`;
        const display = (visible ? 'flex' : 'none');
        return (
            <div className='wd-edit-frame' style={{ display }}>
                <input
                    type='text'
                    onChange = {this.onChange}
                    className={editInputClass}
                    value={value}
                    disabled={!!disabled}
                    placeholder={placeholder}
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
    caption: undefined,
    dim: 'm',
    value: undefined,
    visible: 1,
    placeholder: '',
    disable: {
        caption: false,
        dim: false,
    },
};
