import React, { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Rows from './Rows.jsx';

function TableFixed({
    id,
    classNameContainer = TableFixed.global.classNameContainer,
    className = TableFixed.global.className,
    addClass = TableFixed.global.addClass,
    style = TableFixed.global.style,
    aliasId = TableFixed.global.aliasId,
    data = [],
    fields = [],
    header = true,
    textOnEmpty = TableFixed.global.textOnEmpty,

}) {
    const [widths, setWidths] = useState([]);
    return (
        <div className={`${classNameContainer}`} >
            {(header)
            && <Header
                type={header === true ? 'fields' : 'caption'}
                caption={header}
                fields = {fields}
                widths = {widths}
            />
            }
            {data.length > 0 && <Rows aliasId={aliasId} data={data} fields={fields}/>}
            {(data.length === 0 && textOnEmpty) && <span>{textOnEmpty}</span>}

        </div>
    );
}

TableFixed.global = {

    classNameContainer: 'wd-table-fixed-container',

    className: 'wd-table-fixed',
    addClass: '',
    style: {},
    aliasId: 'ID',
    header: true, // string true false
    textOnEmpty: 'no data', // string or false
    textOnEnd: 'end', // string ot false
};
export default TableFixed;
