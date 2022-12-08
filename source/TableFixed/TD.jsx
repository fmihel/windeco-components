import React from 'react';

function TD({
    value,
    rowData,
    aliasId,
    style = {},
}) {
    return (
        <td style={style }>{value}</td>
    );
}

export default TD;
