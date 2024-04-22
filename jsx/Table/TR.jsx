import React from 'react';
import TD from './TD.jsx';

function TR({
    row = {},
    data = [],
    fields = [],
    onClick,
    onDoubleClick,
    onMouseUp,
    onDraw,
    select = false,
    aliasId,
    aliasAttr,
    aliasSep,
    disableContextMenu,
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
                    onMouseUp = {onMouseUp}
                    onDraw = {onDraw}
                    aliasId = {aliasId}
                    attrs={{ ...(field[aliasAttr] ? { ...field[aliasAttr] } : {}) }}
                    width={field.width}
                    disableContextMenu ={disableContextMenu}
                />)}
            </tr>}
        </>
    );
}

export default TR;
