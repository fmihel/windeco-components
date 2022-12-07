import React from 'react';
import TR from './TR.jsx';

function Table({
    id,
    data = [],
    aliasId,
    fields,
    className = 'wd-table-fixed',
    addClass = '',
    style = {},
}) {
    return (
        <table
            id={`table-${id}`}
            className={`${className} ${addClass}`}
            style={{ ...style }}
            table='true'
        >
            <tbody>
                {data.map((row) => (
                    <TR
                        key = {row[aliasId]}
                        data = {row}
                        fields = {fields}
                        aliasId={aliasId}/>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
