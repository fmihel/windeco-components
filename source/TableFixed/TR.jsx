import React from 'react';
import TD from './TD.jsx';

function TR({
    data = [],
    fields = [], // []
    widths = [],
    aliasId = 'ID',
}) {
    return (
        <tr id={data[aliasId]}>
            {fields.map(({ name }) => (
                <TD
                    key = {name}
                    value={data[name]}
                    rowData = {data}
                    aliasId={aliasId}
                    width={widths[name] || false}
                />))}
        </tr>
    );
}

export default TR;
