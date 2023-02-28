import React from 'react';
import TR from './TR.jsx';

function TBody({
    data = [],
    fields = [],
    aliasId = 'ID',
    noData = 'no data',
    footer = 'end',
    select = [],
    onClick,
}) {
    const haveData = (Array.isArray(data) && data.length > 0);
    return (
        <tbody>
            {(haveData) && data.map((row, i) => <TR
                key = {(aliasId in row) ? row[aliasId] : i}
                data = {data}
                row={row}
                fields={fields}
                select={aliasId in row && select.find((id) => id == row[aliasId])}
                onClick={onClick}
                aliasId = {aliasId}
            />)}
            {(!haveData && noData !== false) && <tr><td nodata='' colSpan={fields.length}>{noData}</td></tr>}
            {(haveData && footer !== false) && <tr><td footer='' colSpan={fields.length}>{footer}</td></tr>}
        </tbody>
    );
}

export default TBody;
