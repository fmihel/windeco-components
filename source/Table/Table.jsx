/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
import React from 'react';
import TableRow from './TableRow.jsx';
import TableHead from './TableHead.jsx';
import {
    binds, ut,
} from 'fmihel-browser-lib';

export default class Table extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onResize', 'onClick', 'onDblClick');

        this.$parent = undefined;
        this.id = undefined;

        this.state = {
            height: 200,
            selected: undefined,
        };
    }

    componentDidMount() {
        this.$self = $(`#${this.id}`);
        this.$parent = this.$self.parent();
        this.resizeObserver = new ResizeObserver(() => {
            this.onResize();
        });
        this.resizeObserver.observe(this.$parent[0]);
        this.onResize();
        if (this.props.onMount) this.props.onMount({ sender: this });
    }

    componentWillUnmount() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    onResize() {
        this.setState({
            height: this.$parent.height(),
        });
    }

    onClick(o) {
        if (this.props.onClick) this.props.onClick({ sender: this, row: o });
    }

    onDblClick(o) {
        if (this.props.onDblClick) this.props.onDblClick({ sender: this, row: o });
    }

    select(row) {
        this.setState({
            selected: row[this.props.id],
        });
    }

    _valid(props) {
        try {
            if (!Array.isArray(props.fields)) throw new Error('Table.props.fields is not array');
            if (props.fields.length === 0) throw new Error('Table.props.fields.length = 0');
            if (typeof props.id !== 'string') throw new Error('Table.props.id is not string');
            if (props.id.length === 0) throw new Error('Table.props.id.length = 0');

            if (!Array.isArray(props.data)) throw new Error('Table.props.data is not array');
            if (props.data.length === 0) throw new Error('Table.props.data.length = 0 no data');

            return true;
        } catch (e) {
            console.warn(e);
        }
        return false;
    }

    render() {
        const {
            data, id, fields, stretch, addClass,
        } = this.props;
        if (this.id === undefined) this.id = `table-${ut.random_str(5)}`;
        const valid = this._valid(this.props);
        let style = {};
        if (stretch) {
            style = { height: `${this.state.height}px` };
        }
        return (
            <div id={this.id} className={`wd-table-container ${addClass}`} style={style}>
                { valid
                && <table className='wd-table' style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <TableHead fields={fields}/>
                    </thead>
                    <tbody>
                        {data.map((row, i) => <TableRow
                            key={id in row ? row[id] : i}
                            {...this.props}
                            row={row}
                            onClick={this.onClick}
                            onDblClick={this.onDblClick}
                            selected={(id in row ? row[id] : i) === this.state.selected}
                        />)}
                    </tbody>
                </table>
                }
                {!valid
                && <div style={{ textAlign: 'center', paddingTop: 5, color: 'red' }}>{'no data'}</div>
                }
            </div>

        );
    }
}
Table.defaultProps = {

    id: 'ID',
    fields: [
        { name: 'ID', caption: 'id', width: 50 },
        { name: 'NAME', caption: 'name' },
        { name: 'AGE', caption: 'age' },
    ],
    data: [
        { ID: 0, NAME: 'mike', AGE: 10 },
        { ID: 1, NAME: 'some', AGE: 34 },
        { ID: 2, NAME: 'kurt', AGE: 23 },
        { ID: 3, NAME: 'doni', AGE: 74 },
        { ID: 4, NAME: 'tori', AGE: 17 },
        { ID: 5, NAME: 'fri', AGE: 42 },
        { ID: 6, NAME: 'doni', AGE: 74 },
        { ID: 7, NAME: 'tori', AGE: 17 },
        { ID: 8, NAME: 'fri', AGE: 42 },
        { ID: 9, NAME: 'doni', AGE: 74 },
        { ID: 10, NAME: 'tori', AGE: 17 },
        { ID: 11, NAME: 'fri', AGE: 42 },
    ],
    addClass: '',
    stretch: true,
    onClick: undefined,
    onDblClick: undefined,
    onMount: undefined,
};
