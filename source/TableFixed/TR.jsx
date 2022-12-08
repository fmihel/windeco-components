import React from 'react';
import TD from './TD.jsx';

function TR({
    data = [],
    fields = [], // []
    aliasId = 'ID',
}) {
    return (
        <tr id={data[aliasId]}>
            {fields.map((field) => (
                <TD
                    key = {field.name}
                    value={data[field.name]}
                    rowData = {data}
                    aliasId={aliasId}
                    style={{
                        ...field.style,
                        ...('width' in field ? { width: field.width } : {}),
                    }}

                />))}
        </tr>
    );
}

export default TR;
