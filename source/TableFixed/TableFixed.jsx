import { binds } from 'fmihel-browser-lib';
import React from 'react';
import TableFixedHead from './TableFixedHead.jsx';
import TableFixedRows from './TableFixedRows.jsx';

export default class TableFixed extends React.Component {
    constructor(p) {
        super(p);
        this.TableFixedHead = undefined;
        this.TableFixedRows = undefined;
        this.observer = undefined;
        this.ref = React.createRef();
        binds(this, 'onMountHead', 'onMountRows');
        binds(this, 'onClick', 'onDblClick');
    }

    select(row) {
        this.TableFixedRoww.select(row);
    }

    onClick(o) {
        if (this.props.onClick) this.props.onClick(o);
    }

    onDblClick(o) {
        if (this.props.onDblClick) this.props.onDblClick(o);
    }

    onMountHead(o) {
        this.TableFixedHead = o.sender;
    }

    onMountRows(o) {
        this.TableFixedRows = o.sender;
    }

    reCulcColWidthHead() {
        if (this.props.header === 'fields' && this.TableFixedHead) {
            this.TableFixedHead.reCulcColWidth({ parent: this, rows: this.TableFixedRows });
        }
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга
        this.observer = new ResizeObserver(() => {
            this.reCulcColWidthHead();
        });
        this.observer.observe(this.ref.current);
    }

    componentWillUnmount() {
        // разовый после последнего рендеринга
        if (this.observer) this.observer.disconnect();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
        // this.reCulcColWidthHead();
    }

    render() {
        const {
            fields, data, header, caption,
        } = this.props;
        return (
            <div className="wd-table-fixed-frame" onClick={() => { this.reCulcColWidthHead(); }} ref = {this.ref}>
                { header === 'fields'
                && <TableFixedHead onMount={this.onMountHead} fields={fields} />
                }
                { header === 'caption'
                && <div className="wd-table-fixed-caption">{caption}</div>
                }
                <div className="wd-table-fixed-frame-rows">
                    <TableFixedRows
                        onMount={this.onMountRows}
                        data={data}
                        fields={fields}
                        onClick={this.onClick}
                        onDblClick={this.onDblClick}
                    />
                </div>
            </div>
        );
    }
}

TableFixed.defaultProps = {
    id: 'ID',
    fields: [
        { name: 'ID', caption: 'id', width: 50 },
        { name: 'NAME', caption: 'name webfjhwb jhwbhwebjr bj jhwfwjerfjh' },
        { name: 'AGE', caption: 'age' },
    ],
    data: [
        { ID: 0, NAME: 'mike no sommatik boran', AGE: 10 },
        { ID: 1, NAME: 'some', AGE: 3494 },
        { ID: 2, NAME: 'kurt', AGE: 23 },
        { ID: 3, NAME: 'doni jqwehjh jh wejfg jwheg jhgj jhg jhwgefjgwejhrfgjwhegrfj jhwfhge jhg jre wjhfwjhegfjh jhgjhg wjehgf whgjh gwjehgf jwhegf wkjefkj kjwhe rfkjhekfjhwe fjkw hrfkjh kjh jkj hwkjrhf kjeh rfkjh kj jwhre fkjhwer kfjkjh kwejhrf kjwehkfjhwekjrh fkwejhrfkwjhrkjjhwgefjgwefg jhwgfjhwe', AGE: 74 },

        { ID: 4, NAME: 'tori', AGE: 17 },
        { ID: 5, NAME: 'fri', AGE: 42 },
        { ID: 6, NAME: 'doni', AGE: 74 },
        { ID: 7, NAME: 'tori', AGE: 17 },
        { ID: 8, NAME: 'fri', AGE: 42 },
        { ID: 9, NAME: 'doni', AGE: 74 },
        { ID: 10, NAME: 'tori', AGE: 17 },
        { ID: 11, NAME: 'fri', AGE: 42 },
        { ID: 12, NAME: 'some', AGE: 34 },
        { ID: 13, NAME: 'kurt', AGE: 23 },
        { ID: 14, NAME: 'doni', AGE: 74 },
        { ID: 15, NAME: 'tori', AGE: 17 },
        { ID: 16, NAME: 'fri', AGE: 42 },
        { ID: 17, NAME: 'doni', AGE: 74 },

    ],
    addClass: '',
    onClick: undefined,
    onDblClick: undefined,
    onMount: undefined,
    header: 'caption', // caption, none
    caption: 'text',
};
