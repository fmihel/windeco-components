/* eslint-disable import/no-extraneous-dependencies */
import { binds } from 'fmihel-browser-lib';
import React from 'react';

export default class Btn extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onClick');
    }

    onClick(o) {
        if (this.props.onClick) {
            this.props.onClick(o);
        }
    }

    render() {
        const value = this.props.value || this.props.children;
        const { addClass, id, hint } = this.props;
        return (
            <input
                type="button"
                value={value}
                onClick={this.onClick}
                className={`wd-btn ${addClass}`}
                id={id}
                title={hint}
            />
        );
    }
}
Btn.defaultProps = {
    onClick: undefined,
    addClass: '',
    id: undefined,
    hint: '',
};
