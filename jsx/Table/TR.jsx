import React from 'react';
import TD from './TD.jsx';

function TR({
    row = {},
    data = [],
    fields = [],
    onClick,
}) {
    return (
        <tr>
            {fields.map((field, i) => <TD
                key = {field.name}
                data = {data}
                row = {row}
                fieldName = {field.name}
                value = {row[field.name]}
                onClick = {onClick}
            />)}
        </tr>
    );
}

export default TR;
