import React from 'react';
import THead from './Table/THead.jsx';
import TBody from './Table/TBody.jsx';

function Table({
    id,
    className = Table.global.className,
    aliasId = Table.global.aliasId,
    aliasAttr = Table.global.aliasAttr,
    data = [],
    fields = [],
    header = true, /// / string true false
    noData = Table.global.noData,
    footer = Table.global.footer,
    select = [],
    style = { ...Table.global.style },
    onClick = undefined,

}) {
    return (

        <table
            type="table"
            {...(className ? { className } : {})}
            {...(id ? { id } : {})}
            style={{ ...Table.global.style, ...style }}
        >
            {(header !== false) && <THead fields={fields} header={header}/>}
            {<TBody
                data={data}
                fields={fields}
                aliasId={aliasId}
                aliasAttr={aliasAttr}
                noData={noData}
                footer = {footer}
                select={select}
                onClick = {onClick}
            />}

        </table>

    );
}

Table.global = {
    className: 'wd-table',
    aliasId: 'ID',
    aliasAttr: '-attr-',
    header: true, // string true false
    noData: 'no data', // string or false
    footer: 'end', // string ot false
    style: {},
};

export default Table;
