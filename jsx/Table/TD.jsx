import React from 'react';

function TD({
    data = [],
    row = {},
    fieldName,
    value,
    onClick,
    onDraw,
    aliasId,
}) {
    const click = () => {
        if (onClick) {
            onClick({
                col: fieldName, value, row, data, aliasId,
            });
        }
    };
    return (
        <td
            onClick={click}
            id={fieldName}
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
