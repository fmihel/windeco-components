import React, { useState, useEffect } from 'react';
import Row from './Container/Row.jsx';

function Container({
    maxCol = 3,
    RowComponent = Row,
    className = '',
    style = { ...Container.global.style },
    attr = {},
    children,
}) {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const out = [];
        children.map((child, i) => {
            if (i % maxCol === 0) {
                out.push([]);
            }
            out[out.length - 1].push(child);
        });
        setRows(out);
    }, [children]);
    return (
        <div
            className={ Container.global.className + className}
            style={{ ...Container.global.style, ...style }}
            {...attr}
        >
            {rows.map((row, key) => (<RowComponent
                key={key}
                row={row}
            />))}
        </div>
    );
}

Container.global = {
    className: 'wd-container',
    addClass: '',
    style: {},
};
export default Container;
