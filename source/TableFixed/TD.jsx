import React from 'react';

function TD({
    value,
    rowData,
    aliasId,
    style = {},
    name = '',
    onClick = undefined,
}) {
    const click = () => {
        if (onClick) {
            onClick({
                col: name, value, row: rowData, aliasId,
            });
        }
    };
    return (
        <td style={style } onClick={click}>{value}</td>
    );
}

export default TD;
