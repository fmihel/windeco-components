import React from 'react';
import TR from './TR.jsx';

function Data({
    id,
    data = [],
    aliasId,
    fields,
    style = {},
    footer = false,
    select = [],
    onClick = undefined,
}) {
    return (
        <>
            <table
                id={`table-${id}`}
                style={{ ...style }}
                data=''
            >
                <tbody>
                    {data.map((row) => (
                        <TR
                            key = {row[aliasId]}
                            data = {row}
                            fields = {fields}
                            aliasId={aliasId}
                            select={(select.findIndex((ID) => row[aliasId] == ID) >= 0)}
                            onClick={onClick}
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

export default Data;
