import React from 'react';
import THead from './Table/THead.jsx';
import TBody from './Table/TBody.jsx';

export const definingCssClass = 'wd-table';

function Table({
    id,
    className = Table.global.className,
    aliasId = Table.global.aliasId,
    aliasAttr = Table.global.aliasAttr,
    aliasSep = Table.global.aliasSep,
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
    attr = {},

}) {
    return (

        <table
            className={`${definingCssClass}${(className ? ` ${className}` : '')}`}
            {...(id ? { id } : {})}
            style={{ ...Table.global.style, ...style }}
            {...attr}
        >
            {(header !== false)
                && <THead
                    fields={fields}
                    header={header}
                    aliasAttr={aliasAttr}
                />}
            {<TBody
                data={data}
                fields={fields}
                aliasId={aliasId}
                aliasAttr={aliasAttr}
                aliasSep={aliasSep}
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
    aliasSep: '-sep-',
    header: true, // string true false
    noData: 'no data', // string or false
    footer: 'end', // string ot false
    style: {},
};

export default Table;
