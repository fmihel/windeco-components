import React, { useEffect, useState, useRef } from 'react';
// import _ from 'lodash';
// import { throttle } from 'lodash';
import Header from './TableFixed/Header.jsx';
import Data from './TableFixed/Data.jsx';
import { culcWidths, haveScrollBar, isWidthsEmpty } from './TableFixed/utils.js';
import DOM from './Utils/DOM.js';
import getSize from './Utils/size.js';
import Error from './Error/Error.jsx';

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
    select = [],
    onClick = undefined,
    onDoubleClick = undefined,
    onDraw = undefined,

}) {
    if (id === undefined) {
        return <Error msg="TableFixed: need set id=XXX"/>;
    }
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [widths, setWidths] = useState([]);
    const [border, setBorder] = useState('');
    const [updater, setUpdater] = useState(0);

    const ref = useRef(null);
    const updateWidths = () => {
        setUpdater(updater + 1);
    };
    useEffect(() => {
        const tableDOM = DOM(`#table-${id}`);
        if (tableDOM) {
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
    }, [data, fields, ref, id, size, header, updater, select]);

    useEffect(() => {
        const tableDOM = DOM(`#table-${id}`);
        if (tableDOM) {
            setBorder((data.length && haveScrollBar(tableDOM, tableDOM.parentNode)) ? 'right bottom' : '');
        } else if (data.length === 0) {
            setBorder('right bottom left');
        } else {
            setBorder('');
        }
    }, [size, data]);

    useEffect(() => {
        let throttle = false;
        const resize = () => {
            if (!throttle) {
                throttle = true;
                setTimeout(() => {
                    if (ref && ref.current) {
                        setSize(getSize(ref.current));
                    }
                    throttle = false;
                }, 50);
            }
        };
        const newObserv = new ResizeObserver(() => {
            resize();
            resize();
        });
        newObserv.observe(ref.current);
        resize();
        return () => {
            newObserv.disconnect();
        };
    }, [ref, header, data]);

    const click = (o) => {
        if (onClick) {
            onClick(o);
        }
        updateWidths();
    };
    const dblclick = (o) => {
        if (onDoubleClick) {
            onDoubleClick(o);
        }
        updateWidths();
    };
    return (
        <div
            id = {id}
            table-fixed=''
            container = 'horiz'
            {...(className ? { className } : {})}
            ref = {ref}
        >
            {(header)
                && <Header
                    id={id}
                    type={header === true ? 'fields' : 'caption'}
                    caption={header}
                    fields = {fields}
                    widths = {widths}
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
                    select={select}
                    onClick={click}
                    onDoubleClick={dblclick}
                    onDraw={onDraw}
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
    className: 'wd-table-fixed',
    aliasId: 'ID',
    aliasAttr: '-attr-',
    header: true, // string true false
    noData: 'no data', // string or false
    footer: 'end', // string ot false

};
export default TableFixed;
