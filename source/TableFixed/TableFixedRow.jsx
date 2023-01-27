import { binds } from 'fmihel-browser-lib';
import React from 'react';
import TableFixedCol from './TableFixedCol.jsx';

export default class TableFixedRow extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onClick', 'onDblClick');
    }

    onClick() {
        if (this.props.onClick) this.props.onClick({ sender: this, row: this.props.row });
    }

    onDblClick() {
        if (this.props.onDblClick) this.props.onDblClick({ sender: this, row: this.props.row });
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга
    }

    componentWillUnmount() {
        // разовый после последнего рендеринга
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
    }

    render() {
        const { row, fields, selected } = this.props;

        return (
            <tr
                className={`wd-table-fixed-row${selected ? ' wd-table-fixed-row-selected' : ''}`}
                onClick={this.onClick}
                onDoubleClick={this.onDblClick}
            >
                {fields.map((field, i) => <TableFixedCol key={`${field.name}-${i}`} width={field.width} value={row[field.name]} />)}
            </tr>
        );
    }
}
TableFixedRow.defaultProps = {
    fields: [],
    row: { },
    onClick: undefined,
    onDblClick: undefined,
    selected: false,
};
