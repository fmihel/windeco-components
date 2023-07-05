import React, {
    useEffect, useRef, useState,
} from 'react';

import parentDOM from './Utils/parentDOM';
import childDOM from './Utils/childDOM';
import absPos from './Utils/abs';
import Table, { definingCssClass as definingCssClassTable } from './Table.jsx';

export const definingCssClass = 'wd-table-fly-head';

function TableFlyHead({
    caption = '',
    className = '',
    classNameHead = Table.global.className,
    classNameCaption = TableFlyHead.global.classNameCaption,
    footerHeight = TableFlyHead.global.footerHeight,
    children,
}) {
    const [display, setDisplay] = useState(false);
    const [heads, setHeads] = useState([]);
    const [width, setWidth] = useState(false);

    const ref = useRef();
    const refHead = useRef();

    const tableDOM = () => {
        if (ref && ref.current) {
            return childDOM(ref.current)[0];
        }
        return undefined;
    };
    const cloneHeader = () => {
        const table = tableDOM();
        if (table) {
            const tabHead = childDOM(table)[0];
            const tr = childDOM(tabHead)[0];
            const ths = childDOM(tr);

            setHeads(ths.map((th) => ({
                dom: th,
                id: th.id,
                innerText: th.innerText,
                clientWidth: th.clientWidth,
                clientHeight: th.clientHeight,

            })));
        }
    };

    const getPos = () => {
        if (ref && ref.current) {
            const tabFrame = ref.current;
            const container = parentDOM(tabFrame);
            const absTab = absPos(tabFrame);
            const absContainer = absPos(container);
            if (absTab.y < absContainer.y && absTab.y + (absTab.h - footerHeight) > absContainer.y) {
                const childs = childDOM(container);
                let off = 0;
                childs.find((child) => {
                    if (child === refHead.current) {
                        return true;
                    } off += absPos(child).h;
                });
                return { left: 0, top: container.scrollTop - off, display: true };
            }
        }
        return { left: 0, top: 0, display: false };
    };
    const updatePos = (newPos = false) => {
        if (refHead && refHead.current) {
            const current = newPos || getPos();
            if (current.display && `${current.top}px` !== refHead.current.style.top) {
                refHead.current.style.top = `${current.top}px`;
            }
            if (!(refHead.current.style.display === 'none') !== current.display) {
                setDisplay(current.display);
            }
        }
    };
    const updateSize = () => {
        setHeads(heads.map((o) => ({
            ...o,
            clientWidth: o.dom.clientWidth,
            clientHeight: o.dom.clientHeight,
        })));
    };

    useEffect(() => {
        cloneHeader();
        //---------------------------------
        const container = parentDOM(ref.current);
        const scroll = () => {
            updatePos();
        };
        container.addEventListener('scroll', scroll);
        const removeScroll = () => {
            container.removeEventListener('scroll', scroll);
        };
        return () => {
            removeScroll();
        };
    }, [ref, refHead]);

    // useEffect(() => {
    //     cloneHeader();
    //     const container = parentDOM(ref.current);
    //     const h = setInterval(() => {
    //         updatePos();
    //         setScrollTop(container.scrollTop);
    //     }, 10);
    //     return () => {
    //         clearInterval(h);
    //     };
    // }, [ref, refHead]);

    useEffect(() => {
        const observ = new ResizeObserver(() => {
            const table = tableDOM();
            if (table && table.clientWidth !== width) {
                setWidth(table.clientWidth);
                if (width !== false) {
                    updateSize();
                    updatePos();
                }
            }
        });
        observ.observe(ref.current);

        return () => {
            observ.disconnect();
        };
    }, [heads, width, ref]);
    return (
        <>
            {(caption && !display) && <div caption='' className={classNameCaption} >{caption}</div>}
            <div ref = {ref} className={className}>{children}</div>
            <div
                ref={refHead}
                className={`${definingCssClass}${className ? ` ${className}` : ''}`}
                style={{
                    ...(display ? {} : { display: 'none' }), position: 'relative',
                }}
            >
                {(caption) && <div caption='' className={classNameCaption}>{caption}</div>}
                <table
                    className={`${definingCssClassTable}${classNameHead ? ` ${classNameHead}` : ''}`}
                    style={{ width }}>
                    <thead>
                        <tr>
                            {heads.map((th) => <th
                                key={th.id}
                                id= {th.id}
                                style={{
                                    width: th.clientWidth,
                                    height: th.clientHeight,
                                }}
                            >
                                {th.innerText}
                            </th>)}
                        </tr>
                    </thead>
                </table>

            </div>

        </>
    );
}
TableFlyHead.global = {
    footerHeight: 64,
    classNameCaption: 'wd-table-fly-caption',
};

export default TableFlyHead;
