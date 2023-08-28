import React from 'react';

function TD({
    value,
    rowData,
    aliasId,
    style = {},
    name = '',
    onClick = undefined,
    onDoubleClick = undefined,
    onDraw = undefined,
    data = [],
    attrs,
}) {
    const click = () => {
        if (onClick) {
            onClick({
                col: name, value, row: rowData, aliasId, data,
            });
        }
    };
    const doubleClick = () => {
        if (onDoubleClick) {
            onDoubleClick({
                col: name, value, row: rowData, aliasId, data,
            });
        }
    };
    return (
        <td
            style={style}
            onClick={click}
            onDoubleClick={doubleClick}
            id={name}
            {...(attrs ? { ...attrs } : {})}
        >
            {onDraw ? onDraw({
                sender: 'td',
                col: name,
                value,
                row: rowData,
                data,
                aliasId,
            }) : value}

        </td>
    );
}

export default TD;
