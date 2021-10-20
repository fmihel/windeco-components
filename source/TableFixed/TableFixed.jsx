import {
    binds, DOM, childDOM, parentDOM,
} from 'fmihel-browser-lib';
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

        this.state = {
            height: 0,
        };

        binds(this, 'onMountHead', 'onMountRows', 'reCulcColWidthHead');
        binds(this, 'onClick', 'onDblClick');
    }

    select(row) {
        this.TableFixedRows.select(row);
    }

    onClick(o) {
        if (this.props.onClick) {
            this.props.onClick({ ...o, sender: this, data: this.props.data });
        }
    }

    onDblClick(o) {
        if (this.props.onDblClick) {
            this.props.onDblClick({ ...o, sender: this, data: this.props.data });
        }
    }

    onMountHead(o) {
        this.TableFixedHead = o.sender;
    }

    onMountRows(o) {
        this.TableFixedRows = o.sender;
    }

    reCulcColWidthHead() {
        if (this.props.headerType === 'fields' && this.TableFixedHead) {
            this.TableFixedHead.reCulcColWidth({ parent: this, rows: this.TableFixedRows });
        }
    }

    stretch() {
        if (this.props.stretch) {
            const $parent = $(this.ref.current).parent();
            this.setState({ height: $parent.height() });
        }
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга
        this.observer = new ResizeObserver(() => {
            this.stretch();
            this.reCulcColWidthHead();
        });
        this.observer.observe(parentDOM(this.ref.current));
        this.observer.observe(this.ref.current);
    }

    componentWillUnmount() {
        // разовый после последнего рендеринга
        if (this.observer) this.observer.disconnect();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
        if (prevProps.fields.length !== this.props.length
                || prevProps.data.length !== this.props.data.length
                || this.TableFixedHead.colWidthIsChange({ parent: this, rows: this.TableFixedRows })) {
            this.reCulcColWidthHead();
        }
    }

    /** проврека на целостность данных */
    validData() {
        const { data, fields } = this.props;
        if (!data) {
            console.warn('TableFixed.data = undefined');
            return false;
        }
        if (!fields) {
            console.warn('TableFixed.fields = undefined');
            return false;
        }

        if (!(data.length)) {
            return false;
        }

        if (!(fields.length)) {
            console.warn('TableFixed.fields.length = 0');
            return false;
        }

        return true;
    }

    /** признак что scrollbar виден */
    haveScrollBar() {
        if (this.TableFixedRows) {
            const table = this.TableFixedRows.ref.current;
            const parent = parentDOM(this.TableFixedRows.ref.current);
            return parent.clientHeight < table.clientHeight;
        }
        return false;
    }

    render() {
        const {
            fields, data, headerType, caption, id, bottomShow: _bottomShow, bottomText, nodataShow, nodataText,
        } = this.props;
        let style = {};
        if (this.props.stretch) {
            style = { height: this.state.height };
        }
        const valid = this.validData();
        const bottomShow = !_bottomShow ? _bottomShow : this.haveScrollBar();
        return (
            <div
                className="wd-table-fixed-frame"
                ref = {this.ref}
                style={style}
            >
                {valid && <>
                    { headerType === 'fields'
                && <TableFixedHead onMount={this.onMountHead} fields={fields} />
                    }
                    { headerType === 'caption'
                && <div className="wd-table-fixed-caption">{caption}</div>
                    }
                    <div className="wd-table-fixed-frame-rows">
                        <TableFixedRows
                            onMount={this.onMountRows}
                            data={data}
                            fields={fields}
                            id={id}
                            onClick={this.onClick}
                            onDblClick={this.onDblClick}
                        />
                        {bottomShow && <div className="wd-table-fixed-bottom">{bottomText}</div>}
                    </div>
                </>}
                {(!valid && nodataShow)
                && <div className="wd-table-fixed-nodata"> {nodataText}</div>
                }
            </div>
        );
    }
}

TableFixed.defaultProps = {
    id: 'ID',
    fields: [
        /*
        { name: 'ID', caption: 'id', width: 50 },
        { name: 'NAME', caption: 'name webfjhwb jhwbhwebjr bj jhwfwjerfjh' },
        { name: 'AGE', caption: 'age' },
        ...
        */
    ],
    data: [/*
        { ID: 0, NAME: 'mike no sommatik boran', AGE: 10 },
        { ID: 1, NAME: 'some', AGE: 3494 },
        ...
        */
    ],
    addClass: '',
    onClick: undefined,
    onDblClick: undefined,
    onMount: undefined,
    //---------------------------------------------------------------------------------------------------
    // ВНИМАНИЕ! у родительского фрейма, в случае stretch=true добавить overflow:hidden
    stretch: true, // включает мехаизм растягивания по высоте таблицы до размеров родителя( с помощью js)
    //---------------------------------------------------------------------------------------------------

    headerType: 'fields', // fields,caption, none
    caption: 'Caption',

    bottomShow: true,
    bottomText: 'конец',

    nodataShow: true,
    nodataText: 'нет данных',
};
