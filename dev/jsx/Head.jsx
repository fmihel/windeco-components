import React from 'react';
import './Head.scss';
// import { flex, binds } from 'fmihel-browser-lib'
export default class Head extends React.Component {
    constructor(p) {
        super(p);
    }

    render() {
        return (
            <div className="block-head">{this.props.children}</div>
        );
    }
}
Head.defaultProps = {
// default
};
