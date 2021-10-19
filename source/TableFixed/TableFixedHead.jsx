import { JX } from 'fmihel-browser-lib';
import React from 'react';
import TableFixedHeadCol from './TableFixedHeadCol.jsx';

export default class TableFixedHead extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            widths: p.fields.map(() => 0),
        };
    }

    reCulcColWidth(o) {
        // console.log('reculc');
        const $row = $(o.rows.ref.current).find('tr:first:visible');
        const $cols = $row.find('td');
        const widths = [];
        let sum = 0;
        $.each($cols, (i, col) => {
            const $col = $(col);
            const padLeft = parseInt($col.css('paddingLeft'), 10);
            const padRight = parseInt($col.css('paddingRight'), 10);
            const w = $(col).width() + 2 + padLeft + padRight;
            widths[i] = w;
            sum += w;
        });

        if (widths.length > 0) widths[widths.length - 1] = widths[widths.length - 1] + (parseInt($(o.parent.ref.current).width(), 10) - sum);

        this.setState({ widths });
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
        const { fields } = this.props;
        const { widths } = this.state;
        return (
            <table className="wd-table-fixed-head" >
                <thead>
                    <tr className="wd-table-fixed-head-row">
                        {fields.map((field, i) => <TableFixedHeadCol key = {field.name} name={field.name} caption={field.caption} width={widths[i]}/>)}
                    </tr>
                </thead>
            </table>
        );
    }
}
TableFixedHead.defaultProps = {
    fields: [],
};
