import React, { useState, useRef, useEffect } from 'react';
import abs from '../Utils/abs';
import Modal from '../Modal/ModalEx.jsx';

function listPos({
    left, top, width, height,
}) {
    return {
        left, top, width, height,
    };
}
function ComboList({
    list = [],
    left = 0,
    top = 0,
    width = 100,
    height = 100,
    className = 'wd-combo-list',
    addClass = '',
    aliasId = 'id',
    aliasCaption = 'caption',
}) {
    return (
        <div
            className={`${className} ${addClass}`}
            style = {{
                ...listPos({
                    left,
                    top,
                    width,
                    height,
                }),
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
    const ref = useRef(null);
    const [size, setSize] = useState({
        left: 0, top: 0, width: 0, height: 0,
    });

    useEffect(() => {
        if (open) {
            const area = abs(ref.current);
            setSize({
                left: area.x, top: area.y, width: area.w, height: area.h,
            });
        }
    }, [open]);

    const click = () => {
        setOpen(!open);
    };
    const closeList = () => {
        setOpen(false);
    };
    return (
        <>
            <div
                id={id}
                className={`${className} ${addClass}`}
                style={{ ...ComboBox.global.style, ...style }}
                onClick = {click}
                ref = {ref}
            >
                {(selectCaption) && selectCaption}
                {(!selectCaption && placeholder) && placeholder}
            </div>
            <Modal
                visible = {open}
                onClickShadow={closeList}
            >
                <ComboList
                    list = {list}
                    {...size}
                />
            </Modal>
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
