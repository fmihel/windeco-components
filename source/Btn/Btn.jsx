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
        const value = this.props.children;
        const { addClass } = this.props;
        return (
            <input type="button" value={value} onClick={this.onClick} className={`wd-btn ${addClass}`}/>
        );
    }
}
Btn.defaultProps = {
    onClick: undefined,
    addClass: '',
};
