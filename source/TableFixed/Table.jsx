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
    footer = false,
}) {
    return (
        <>
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
                            aliasId={aliasId}

                        />
                    ))}
                </tbody>
            </table>
            {(footer)
                && <div footer="true">{footer}</div>
            }
        </>
    );
}

export default Table;
