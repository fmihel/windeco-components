import React, { useEffect, useState, useRef } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Table from './Table.jsx';
import { culcWidths, eqWidths } from './utils';
import DOM from '../Utils/DOM';
import getId from '../Utils/getId';

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
    header = true,
    textOnEmpty = TableFixed.global.textOnEmpty,
    minWidth = 500,

}) {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [widths, setWidths] = useState([]);
    const [vertHeight, setVertHeight] = useState(0);

    const ref = useRef(null);

    useEffect(() => {
        const tableDOM = DOM(`#table-${id}`);
        if (tableDOM) {
            const newWidths = culcWidths(tableDOM, fields);
            setWidths(newWidths);
        }
    }, [data, fields, ref, id, size]);

    useEffect(() => {
        const headerDOM = DOM(`#header-${id}`);
        if (headerDOM) {
            setVertHeight(size.height - headerDOM.offsetHeight);
        }
    }, [id, size]);

    useEffect(() => {
        const resize = () => {
            if (ref.current) {
                setSize({
                    width: ref.current.offsetWidth,
                    height: ref.current.offsetHeight,
                });
            }
        };
        const newObserv = new ResizeObserver(() => {
            resize();
            resize();
        });
        newObserv.observe(ref.current);

        return () => {
            newObserv.observer.disconnect();
        };
    }, [ref]);

    // eslint-disable-next-line no-return-assign

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
                className={`${classNameVert} ${addClassVert}`}
                style={{ height: vertHeight, ...(minWidth > 0 && size.width < minWidth ? { width: minWidth } : {}) }}
            >
                {data.length > 0
                && <Table
                    id={id}
                    className={className}
                    addClass={addClass}
                    aliasId={aliasId}
                    data={data}
                    fields={fields}
                    style={{ width: (minWidth > 0 && size.width < minWidth) ? minWidth : '100%' }}
                />
                }
            </div>
            {(data.length === 0 && textOnEmpty)
                && <span>
                    {textOnEmpty}
                </span>
            }

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
    textOnEnd: 'end', // string ot false
};
export default TableFixed;
