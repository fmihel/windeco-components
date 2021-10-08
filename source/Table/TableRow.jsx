import { binds } from 'fmihel-browser-lib';
import React from 'react';
import TableCol from './TableCol.jsx';
// import { flex, binds } from 'fmihel-browser-lib'
export default class TableRow extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onClick');
    }

    onClick(o) {
        if (this.props.onClick) this.props.onClick(this.props.row);
    }

    render() {
        const { row, fields, selected } = this.props;
        return (
            <tr className={`wd-row${selected ? ' wd-row-selected' : ''}`} onClick={this.onClick}>
                {fields.map((field) => <TableCol key={field.name} {...field} value={row[field.name]}/>)}
            </tr>
        );
    }
}
TableRow.defaultProps = {
    fields: [
        { name: 'ID', caption: 'id' },
        { name: 'NAME', caption: 'name' },
        { name: 'AGE', caption: 'age' },
    ],

    row: { ID: 0, NAME: 'mike', age: 10 },
    onClick: undefined,
    selected: false,
};
