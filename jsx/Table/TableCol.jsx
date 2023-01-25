import React from 'react';
// import { flex, binds } from 'fmihel-browser-lib'
export default class TableCol extends React.Component {
    constructor(p) {
        super(p);
    }

    render() {
        const { value } = this.props;
        return (
            <td className="wd-col">{value}</td>
        );
    }
}
TableCol.defaultProps = {

    value: '',
};
