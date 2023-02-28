import React from 'react';
import TD from './TD.jsx';

function TR({
    row = {},
    data = [],
    fields = [], // []
    aliasId = 'ID',
    select = false,
    onClick = undefined,
}) {
    return (
        <tr id={row[aliasId]} {...(select ? { select: 'true' } : {})}>
            {fields.map((field) => (
                <TD
                    key = {field.name}
                    name={field.name}
                    value={row[field.name]}
                    rowData = {row}
                    data={data}
                    aliasId={aliasId}
                    style={{
                        ...field.style,
                        ...('width' in field ? { width: field.width } : {}),
                    }}
                    onClick={onClick}

                />))}
        </tr>
    );
}

export default TR;
