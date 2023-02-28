import React from 'react';
import TR from './TR.jsx';

function TBody({
    data = [],
    fields = [],
    aliasId = 'ID',
}) {
    return (
        <tbody>
            {data.map((row, i) => <TR
                key = {(aliasId in row) ? row[aliasId] : i}
                data = {data}
                row={row}
                fields={fields}
            />)}
        </tbody>
    );
}

export default TBody;
