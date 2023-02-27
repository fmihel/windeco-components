import React, { useEffect, useState, useRef } from 'react';
// import _ from 'lodash';
// import { throttle } from 'lodash';
import Header from './TableFixed/Header.jsx';
import Table from './TableFixed/Table.jsx';
import { culcWidths, haveScrollBar, isWidthsEmpty } from './TableFixed/utils.js';
import DOM from './Utils/DOM.js';
import getId from './Utils/getId.js';
import getSize from './Utils/size.js';
import Error from './Error/Error.jsx';

function TableFixed({
    id = undefined,
    classNameHoriz = TableFixed.global.classNameHoriz,
    classNameVert = TableFixed.global.classNameVert,
    addClassHoriz = TableFixed.global.addClassHoriz,
    addClassVert = TableFixed.global.addClassVert,

    className = TableFixed.global.className,
    addClass = TableFixed.global.addClass,

    aliasId = TableFixed.global.aliasId,
    data = [],
    fields = [],
    header = true, /// / string true false
    noData = TableFixed.global.noData,
    footer = TableFixed.global.footer,
    select = [],
    onClick = undefined,

}) {
    if (id === undefined){
        return <Error msg="TableFixed: need set id=XXX"/>
    }
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [widths, setWidths] = useState([]);
    const [border, setBorder] = useState('');
    const ref = useRef(null);
    
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
            const newWidths = fields.map(() => size.width / fields.length);
            setWidths(newWidths);
        }
    }, [data, fields, ref, id, size, header]);

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
    return (
        <div
            id = {id}
            className={`${classNameHoriz} ${addClassHoriz}`}
            ref = {ref}
        >
            {(header)
                && <Header
                    id={id}
                    className={className}
                    addClass={addClass}
                    type={header === true ? 'fields' : 'caption'}
                    caption={header}
                    fields = {fields}
                    widths = {widths}
                />
            }
            <div
                className={`${classNameVert} ${addClassVert} `}
                border={border + (header === false ? ' top' : '')}
            >
                {data.length > 0
                && <Table
                    id={id}
                    className={className}
                    addClass={addClass}
                    aliasId={aliasId}
                    data={data}
                    fields={fields}
                    footer={footer}
                    select={select}
                    onClick={onClick}
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

    classNameHoriz: 'wd-table-fixed-horiz',
    classNameVert: 'wd-table-fixed-vert',
    addClassHoriz: 'wd-scrollbar',
    addClassVert: 'wd-scrollbar',

    className: 'wd-table-fixed',
    addClass: '',
    aliasId: 'ID',
    header: true, // string true false
    noData: 'no data', // string or false
    footer: 'end', // string ot false

};
export default TableFixed;
