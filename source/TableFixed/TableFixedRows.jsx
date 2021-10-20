import React from 'react';
import { binds } from 'fmihel-browser-lib';
import TableFixedRow from './TableFixedRow.jsx';

export default class TableFixedRows extends React.Component {
    constructor(p) {
        super(p);
        this.ref = React.createRef();
        binds(this, 'onClick', 'onDblClick');
        this.state = {
            selected: false,
        };
    }

    select(row) {
        this.setState({ selected: row });
    }

    onClick(o) {
        if (this.props.onClick) this.props.onClick({ sender: this, row: o.row });
    }

    onDblClick(o) {
        if (this.props.onDblClick) this.props.onDblClick({ sender: this, row: o.row });
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга
        if (this.props.onMount) this.props.onMount({ sender: this });
    }

    componentWillUnmount() {
        // разовый после последнего рендеринга
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
    }

    render() {
        const {
            data, id, fields,
        } = this.props;
        const { selected } = this.state;
        return (
            <table className="wd-table-fixed-rows" ref={this.ref}>
                <tbody>
                    {data.map((row, i) => <TableFixedRow
                        key={id in row ? row[id] : i}
                        row={row}
                        fields={fields}
                        onClick={this.onClick}
                        onDblClick={this.onDblClick}
                        selected={selected && selected[id] == row[id]}
                    />)}
                </tbody>
            </table>
        );
    }
}
TableFixedRows.defaultProps = {
    id: 'ID',
    fields: [
    ],
    data: [],
    onMount: undefined,
    onClick: undefined,
    onDblClick: undefined,
};
