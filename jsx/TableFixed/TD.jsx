import React from 'react';

function TD({
    value,
    rowData,
    aliasId,
    style = {},
    name = '',
    onClick = undefined,
    data = [],
}) {
    const click = () => {
        if (onClick) {
            onClick({
                col: name, value, row: rowData, aliasId, data,
            });
        }
    };
    return (
        <td style={style } onClick={click} id={name}>{value}</td>
    );
}

export default TD;
