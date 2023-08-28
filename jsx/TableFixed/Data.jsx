import React, { forwardRef } from 'react';
import TR from './TR.jsx';

const Data = forwardRef(({
    id,
    data = [],
    aliasId,
    aliasAttr,
    fields,
    style = {},
    footer = false,
    select = [],
    onClick = undefined,
    onDoubleClick = undefined,
    onDraw = undefined,

}, ref) => (
    <>
        <table
            id={`table-${id}`}
            style={{ ...style }}
            data=''
            ref = {ref}
        >
            <tbody>
                {data.map((row) => (
                    <TR
                        key = {row[aliasId]}
                        row = {row}
                        data={data}
                        fields = {fields}
                        aliasId={aliasId}
                        aliasAttr={aliasAttr}
                        select={(select.findIndex((ID) => row[aliasId] == ID) >= 0)}
                        onClick={onClick}
                        onDoubleClick={onDoubleClick}
                        onDraw={onDraw}
                    />
                ))}
            </tbody>
        </table>
        {(footer)
                && <div footer="true">{footer}</div>
        }
    </>
));

export default Data;
