/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { ut } from 'fmihel-browser-lib';
import React from 'react';
// import { flex, binds } from 'fmihel-browser-lib'
export default class Label extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            labelName: `lb_${ut.random_str(5)}`,

        };
    }

    render() {
        const { caption } = this.props;
        const { labelName } = this.state;
        return (
            <div className="wd-label-frame">

                <label htmlFor={labelName} className="wd-label">{caption}</label>

                <div>
                    {React.cloneElement(this.props.children, { labelName })}
                </div>
            </div>
        );
    }
}
Label.defaultProps = {
    caption: '',
};
