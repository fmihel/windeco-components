import React from 'react';
import './Block.scss';
// import { flex, binds } from 'fmihel-browser-lib'
export default class Block extends React.Component {
    constructor(p) {
        super(p);
    }

    render() {
        const { addClass } = this.props;
        return (
            <div className={`block ${addClass}`}>
                <div></div>
                <div>{this.props.children}</div>
                <div></div>
            </div>
        );
    }
}
Block.defaultProps = {
    addClass: '',
};
