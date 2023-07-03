import React, {
    useEffect, useRef, useState,
} from 'react';
import {
    JX, childDOM, parentDOM,
} from 'fmihel-browser-lib';

function TableFlyHead({
    cap = 'head',
    className = '',
    children,
}) {
    const [pos, setPos] = useState({ left: 0, top: 0 });
    const ref = useRef();
    const refHead = useRef();
    const updatePos = () => {
        const tab = ref.current;
        const container = parentDOM(tab);
        const absTab = JX.abs(tab);
        const absContainer = JX.abs(container);
        if (absTab.y < absContainer.y && absTab.y + absTab.h > absContainer.y) {
            const childs = childDOM(container);
            let off = 0;
            for (let i = 0; i < childs.length; i++) {
                const child = childs.item(i);

                if (child === refHead.current) {
                    break;
                } else off += JX.pos(child).h;
            }
            setPos({ left: 0, top: container.scrollTop - off });
        } else {
            setPos({ left: 0, top: 0, display: 'none' });
        }
    };
    const doScroll = () => {
        updatePos();
    };
    useEffect(() => {
        updatePos();
    }, []);
    useEffect(() => {
        const container = parentDOM(ref.current);
        container.addEventListener('scroll', doScroll);
        const removeScroll = () => {
            container.removeEventListener('scroll', doScroll);
        };
        return () => {
            console.log('remove');
            removeScroll();
        };
    }, [ref, refHead]);
    return (
        <>
            <div ref= {refHead} className={`wd-table-fly-head${className ? ` ${className}` : ''}`} style={{ ...pos }}>{cap}</div>
            <div ref = {ref}>{children}</div>
        </>
    );
}

export default TableFlyHead;
