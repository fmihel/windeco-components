import React from 'react';

function TD({
    value,
    rowData,
    aliasId,
    width = false,
    style = {},
}) {
    return (
        <td
            style={{ ...style, ...(width ? { width } : {}) }}
        >
            {value}
        </td>
    );
}

export default TD;
