import React, { useState } from 'react';

function ComboList({
    list = [],
    left = 0,
    top = 0,
    width = 0,
    height = 0,
    className = 'wd-combo-list',
    addClass = '',
    aliasId = 'id',
    aliasCaption = 'caption',
    visible = false,
}) {
    return (
        <div
            className={`${className} ${addClass}`}
            style = {{
                left,
                top,
                width,
                height,
                ...(visible ? {} : { display: 'none' }),
            }}
        >
            {list.map((item) => {

            })}
        </div>
    );
}

function ComboBox({
    id,
    className = ComboBox.global.className,
    addClass = ComboBox.global.addClass,
    style = ComboBox.global.style,
    list = [],
    /*
        list:[{ id, caption},{...},...]
    */
    select = false,
    onChange = undefined,
    onGetItemClass = undefined,
    placeholder = ComboBox.global.placeholder,
    aliasId = ComboBox.global.aliasId,
    aliasCaption = ComboBox.global.aliasCaption,

}) {
    const selectIndex = list.findIndex((item) => (item[aliasId] == select));
    const selectCaption = selectIndex >= 0 ? list[selectIndex][aliasCaption] : false;
    const [open, setOpen] = useState(false);

    // console.log(id, 'list', list, selectIndex);
    const click = () => {

    };
    return (
        <>
            <div
                id={id}
                className={`${className} ${addClass}`}
                style={{ ...ComboBox.global.style, ...style }}
                onClick = {click}
            >
                {(selectCaption) && selectCaption}
                {(!selectCaption && placeholder) && placeholder}
            </div>
            <ComboList
                list = {list}
                visible = {open}
            />
        </>
    );
}

ComboBox.global = {
    className: 'wd-combo',
    addClass: '',
    placeholder: '-выбрать-',
    style: {},

    aliasId: 'id',
    aliasCaption: 'caption',

};

export default ComboBox;
