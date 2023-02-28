import React from 'react';
import TD from './TD.jsx';

function TR({
    row = {},
    data = [],
    fields = [],
    onClick,
    select = false,
    aliasId,
}) {
    return (
        <tr
            {...(select ? { select: '' } : {})}
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
