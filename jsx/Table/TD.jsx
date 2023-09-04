import React from 'react';

function TD({
    data = [],
    row = {},
    fieldName,
    value,
    onClick,
    onDoubleClick,
    onDraw,
    aliasId,
    attrs,
    width,
}) {
    const click = () => {
        if (onClick) {
            onClick({
                col: fieldName, value, row, data, aliasId,
            });
        }
    };
    const doubleClick = () => {
        if (onDoubleClick) {
            onDoubleClick({
                col: fieldName, value, row, data, aliasId,
            });
        }
    };
    return (
        <td
            onClick={click}
            onDoubleClick= {doubleClick}
            id={fieldName}
            {...(attrs ? { ...attrs } : {})}
            {...(width ? { style: { width } } : {})}
        >
            {onDraw ? onDraw({
                sender: 'td',
                col: fieldName,
                value,
                row,
                data,
                aliasId,
            }) : value}
        </td>
    );
}

export default TD;
