import React, { useEffect, useState, useRef } from 'react';
// import _ from 'lodash';
// import { throttle } from 'lodash';
import Header from './TableFixed/Header.jsx';
import Data from './TableFixed/Data.jsx';
import { culcWidths, haveScrollBar, isWidthsEmpty } from './TableFixed/utils.js';
import DOM from '../utils/DOM.js';
import getSize from '../utils/size.js';
import Error from './Error/Error.jsx';

const definingCssClass = 'wd-table-fixed';

function TableFixed({
    id = undefined,
    className = TableFixed.global.className,

    aliasId = TableFixed.global.aliasId,
    aliasAttr = TableFixed.global.aliasAttr,
    data = [],
    fields = [],
    header = true, /// / string true false
    noData = TableFixed.global.noData,
    footer = TableFixed.global.footer,
    select = false,
    onClick = undefined,
    onDoubleClick = undefined,
    onDraw = undefined,
    attr = {},

}) {
    if (id === undefined) {
        return <Error msg="TableFixed: need set id=XXX"/>;
    }
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [widths, setWidths] = useState([]);
    const [border, setBorder] = useState('');

    const ref = useRef(null);
    const refTable = useRef(null);

    useEffect(() => {
        if (refTable.current) {
            const tableDOM = refTable.current;

            if (header === true) {
                const newWidths = culcWidths(tableDOM, size);

                if (!isWidthsEmpty(newWidths)) {
                    setWidths(newWidths);
                }
            } else if (typeof header === 'string') {
                setWidths([size.width]);
            }
        } else if (typeof header === 'string') {
            setWidths([size.width]);
        } else {
            const midWidth = size.width / fields.length;
            const newWidths = fields.map(() => midWidth);
            setWidths(newWidths);
        }
    }, [refTable, size, header, data, fields, select]);

    useEffect(() => {
        if (refTable.current) {
            const tableDOM = refTable.current;
            setBorder((data.length && haveScrollBar(tableDOM, tableDOM.parentNode)) ? 'right bottom' : '');
        } else if (data.length === 0) {
            setBorder('right bottom left');
        } else {
            setBorder('');
        }
    }, [size, data, refTable]);

    useEffect(() => {
        const observ = new ResizeObserver(() => {
            if (ref && ref.current) {
                setSize(getSize(ref.current));
            }
        });
        observ.observe(ref.current);

        return () => {
            observ.disconnect();
        };
    }, [ref, header, data]);

    const click = (o) => {
        if (onClick) {
            onClick(o);
        }
    };
    const dblclick = (o) => {
        if (onDoubleClick) {
            onDoubleClick(o);
        }
    };
    return (
        <div
            id = {id}
            container = 'horiz'
            className={`${definingCssClass}${(className ? ` ${className}` : '')}`}
            ref = {ref}
            {...attr}
        >
            {(header)
                && <Header
                    id={id}
                    type={header === true ? 'fields' : 'caption'}
                    caption={header}
                    fields = {fields}
                    widths = {widths}
                    aliasAttr={aliasAttr}
                />
            }
            <div
                container = 'vert'
                border={border + (header === false ? ' top' : '')}
            >
                {data.length > 0
                && <Data
                    id={id}
                    aliasId={aliasId}
                    aliasAttr={aliasAttr}
                    data={data}
                    fields={fields}
                    footer={footer}
                    select={select || []}
                    onClick={click}
                    onDoubleClick={dblclick}
                    onDraw={onDraw}
                    ref = {refTable}
                />
                }
                {(data.length === 0 && noData)
                    && <div no-data='true'>
                        {noData}
                    </div>
                }
            </div>

        </div>
    );
}

TableFixed.global = {
    className: '',
    aliasId: 'ID',
    aliasAttr: '-attr-',
    header: true, // string true false
    noData: 'no data', // string or false
    footer: 'end', // string ot false

};
export default TableFixed;
