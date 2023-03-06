import React from 'react';

function TD({
    data = [],
    row = {},
    fieldName,
    value,
    onClick,
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
            {value}
        </td>
    );
}

export default TD;
