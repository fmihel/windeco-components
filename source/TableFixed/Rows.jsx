import React from 'react';
import TR from './TR.jsx';

function Rows({
    id,
    data = [],
    aliasId,
    fields,
    widths,
}) {
    return (
        <table
            // id={id}
            // className={`${className} ${addClass}`}
            // style={{ ...TableFixed.global.style, ...style }}
        >
            <tbody>
                {data.map((row) => (
                    <TR
                        key = {row[aliasId]}
                        data = {row}
                        fields = {fields}
                        widths={widths}
                        aliasId={aliasId}/>
                ))}
            </tbody>
        </table>
    );
}

export default Rows;
