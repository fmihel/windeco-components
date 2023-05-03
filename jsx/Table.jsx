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
    onDoubleClick = undefined,
    onDraw = undefined,

}) {
    return (

        <table
            table=''
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
                onDoubleClick = {onDoubleClick}
                onDraw = {onDraw}
            />}

        </table>

    );
}

Table.global = {
    className: '',
    aliasId: 'ID',
    aliasAttr: '-attr-',
    header: true, // string true false
    noData: 'no data', // string or false
    footer: 'end', // string ot false
    style: {},
};

export default Table;
