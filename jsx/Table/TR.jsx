import React from 'react';
import TD from './TD.jsx';

function TR({
    row = {},
    data = [],
    fields = [],
    onClick,
    select = false,
    aliasId,
    aliasAttr,
}) {
    return (
        <tr
            {...(select ? { select: '' } : {})}
            {...row[aliasAttr]}
        >
            {fields.map((field, i) => <TD
                key = {field.name}
                data = {data}
                row = {row}
                fieldName = {field.name}
                value = {row[field.name]}
                onClick = {onClick}
                aliasId = {aliasId}

            />)}
        </tr>
    );
}

export default TR;
