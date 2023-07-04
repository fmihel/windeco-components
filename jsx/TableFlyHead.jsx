import React, {
    useEffect, useRef, useState,
} from 'react';

import parentDOM from './Utils/parentDOM';
import childDOM from './Utils/childDOM';
import absPos from './Utils/abs';
import Table, { definingCssClass as definingCssClassTable } from './Table.jsx';

export const definingCssClass = 'wd-table-fly-head';

function TableFlyHead({
    className = '',
    classNameHead = Table.global.className,
    children,
}) {
    const [pos, setPos] = useState({ left: 0, top: 0 });
    const [heads, setHeads] = useState([]);
    const [width, setWidth] = useState(false);

    const ref = useRef();
    const refHead = useRef();
    const tableDOM = () => {
        if (ref) {
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
    const updatePos = () => {
        const tabFrame = ref.current;
        const container = parentDOM(tabFrame);
        const absTab = absPos(tabFrame);
        const absContainer = absPos(container);
        if (absTab.y < absContainer.y && absTab.y + absTab.h > absContainer.y) {
            const childs = childDOM(container);
            let off = 0;
            childs.find((child) => {
                if (child === refHead.current) {
                    return true;
                } off += absPos(child).h;
            });
            setPos({ left: 0, top: container.scrollTop - off });
        } else {
            setPos({ left: 0, top: 0, display: 'none' });
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
        container.addEventListener('scroll', updatePos);
        const removeScroll = () => {
            container.removeEventListener('scroll', updatePos);
        };
        //---------------------------------
        updatePos();
        return () => {
            removeScroll();
        };
    }, [ref, refHead]);

    useEffect(() => {
        const observ = new ResizeObserver(() => {
            const table = tableDOM();
            if (table && table.clientWidth !== width) {
                setWidth(table.clientWidth);
                if (width !== false) updateSize();
            }
        });
        observ.observe(ref.current);

        return () => {
            observ.disconnect();
        };
    }, [heads, width, ref]);
    return (
        <>
            <div
                ref={refHead}
                className={`${definingCssClass}${className ? ` ${className}` : ''}`}
                style={{ ...pos, position: 'relative' }}
            >
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
            <div ref = {ref} className={className}>{children}</div>
        </>
    );
}

export default TableFlyHead;
