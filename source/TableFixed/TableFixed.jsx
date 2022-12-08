import React, { useEffect, useState, useRef } from 'react';
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
    header = true,
    textOnEmpty = TableFixed.global.textOnEmpty,

}) {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [widths, setWidths] = useState([]);
    const [vertHeight, setVertHeight] = useState(0);
    const [border, setBorder] = useState({});
    const ref = useRef(null);

    useEffect(() => {
        const tableDOM = DOM(`#table-${id}`);
        if (tableDOM) {
            const newWidths = culcWidths(tableDOM, size);
            if (!isWidthsEmpty(newWidths)) {
                setWidths(newWidths);
            }
        }
    }, [data, fields, ref, id, size]);

    useEffect(() => {
        const headerDOM = DOM(`#header-${id}`);
        if (headerDOM) {
            const headerSize = getSize(headerDOM, 'offset');
            setVertHeight(size.height - headerSize.height);
        }
    }, [id, size]);

    useEffect(() => {
        const tableDOM = DOM(`#table-${id}`);
        if (tableDOM) {
            const frameDOM = tableDOM.parentNode;
            setBorder((data.length && haveScrollBar(tableDOM, frameDOM)) ? { border: 'for-scroll' } : {});
        } else {
            setBorder(false);
        }
    }, [size, data]);

    useEffect(() => {
        let first = true;
        const resize = () => {
            if (ref.current) {
                setSize(getSize(ref.current));
            }
        };

        // const resize = _.throttle(_resize, 100);
        const newObserv = new ResizeObserver(() => {
            resize();
            if (first) {
                resize();
            }
            first = false;
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
                className={`${classNameVert} ${addClassVert} `}
                style={{
                    height: vertHeight,
                }}
                {...border}
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
