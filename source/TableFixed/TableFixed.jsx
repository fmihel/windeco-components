import React from 'react';

function TableFixed({
    id,
    className = TableFixed.global.className,
    addClass = TableFixed.global.addClass,
    style = TableFixed.global.style,
    aliasId = TableFixed.global.aliasId,
    data = [],
    fields = [

    ],

}) {
    return (
        <table
            id={id}
            className={`${className} ${addClass}`}
            style={{ ...TableFixed.global.style, ...style }}
        >

        </table>
    );
}

TableFixed.global = {
    className: 'wd-table-fixed',
    addClass: '',
    style: {},
    aliasId: 'ID',
    textOnEmpty: 'no data', // string or false
    footer: 'end', // string ot false

};
export default TableFixed;
