import React from 'react';

function TD({
    data = [],
    row = {},
    fieldName,
    value,
    onClick,
}) {
    const click = () => {
        if (onClick) {
            onClick({
                fieldName, value, row, data,
            });
        }
    };
    return (
        <td onClick={click}>
            {value}
        </td>
    );
}

export default TD;
