import React, { useEffect, useState, useRef } from 'react';
// import _ from 'lodash';
// import { throttle } from 'lodash';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Table from './Table.jsx';
import { culcWidths, haveScrollBar, isWidthsEmpty } from './utils';
import DOM from '../Utils/DOM';
import getId from '../Utils/getId';
import getSize from '../Utils/size';

function TableFixed({
    id = getId(),
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
    textOnEmpty = TableFixed.global.textOnEmpty,
    footer = TableFixed.global.footer,
    select = [],

}) {
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
        // const resize = throttle(_resize, 100);
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
                style={{
                    // height: vertHeight,
                }}
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
                    style={{ width: '100%' }}
                    footer={footer}
                />
                }
                {(data.length === 0 && textOnEmpty)
                    && <span>
                        {textOnEmpty}
                    </span>
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
    textOnEmpty: 'no data', // string or false
    footer: 'end', // string ot false

};
export default TableFixed;
