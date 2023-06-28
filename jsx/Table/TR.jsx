import React from 'react';
import TD from './TD.jsx';

function TR({
    row = {},
    data = [],
    fields = [],
    onClick,
    onDoubleClick,
    onDraw,
    select = false,
    aliasId,
    aliasAttr,
    aliasSep,
}) {
    return (
        <>
            {(aliasSep in row)
            && <tr
                {...(aliasId in row ? { id: row[aliasId] } : {})}
                {...row[aliasAttr]}
                sep={''}
            >
                <td colSpan={fields.length}>{row[aliasSep]}</td>
            </tr>
            }
            {!(aliasSep in row)
            && <tr

                {...(aliasId in row ? { id: row[aliasId] } : {})}
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
                    onDoubleClick={onDoubleClick}
                    onDraw = {onDraw}
                    aliasId = {aliasId}

                />)}
            </tr>}
        </>
    );
}

export default TR;
