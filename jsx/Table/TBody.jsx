import React from 'react';
import TR from './TR.jsx';

function TBody({
    data = [],
    fields = [],
    aliasId = 'ID',
    aliasAttr = '-attr-',
    noData = 'no data',
    footer = 'end',
    select = [],
    onClick,
    onDraw,
}) {
    const haveData = (Array.isArray(data) && data.length > 0);

    return (
        <tbody>
            {(haveData) && data.map((row, i) => <TR
                key = {(aliasId in row) ? row[aliasId] : i}
                data = {data}
                row={row}
                fields={fields}
                select={aliasId in row && select.findIndex((id) => `${id}` === `${row[aliasId]}`) > -1}
                onClick={onClick}
                onDraw={onDraw}
                aliasId = {aliasId}
                aliasAttr = {aliasAttr}

            />)}
            {(!haveData && noData !== false) && <tr><td nodata='' colSpan={fields.length}>{noData}</td></tr>}
            {(haveData && footer !== false) && <tr><td footer='' colSpan={fields.length}>{footer}</td></tr>}
        </tbody>
    );
}

export default TBody;
