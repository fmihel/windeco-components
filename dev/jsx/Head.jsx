import React from 'react';
// import { flex, binds } from 'fmihel-browser-lib'
export default class Head extends React.Component {
    constructor(p) {
        super(p);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}
Head.defaultProps = {
// default
};
