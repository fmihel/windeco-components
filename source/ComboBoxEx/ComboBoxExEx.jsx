import React, { useState, useRef, useEffect } from 'react';
import abs from '../Utils/abs';
import Modal from '../Modal/ModalEx.jsx';
import screen from '../Utils/screen';

function listPos({
    left, top, width, height,
}) {
    const out = {
        left, top, width, height,
    };
    out.height = 150;
    const scr = screen();
    if (out.top + height + out.height > scr.height) {
        out.top -= out.height + 3;
    } else {
        out.top = top + height + 1;
    }
    return out;
}
function ComboItem({
    caption = '',
    className = 'wd-combo-item',
    onClick = undefined,
    data = {},
    disabled = false,
}) {
    const click = () => {
        if (!disabled && onClick) {
            onClick(data);
        }
    };
    return (
        <div
            className={`${className}`}
            onClick={click}
            title={caption}
            {...(disabled ? { disabled: true } : {})}
        >
            {caption}
        </div>
    );
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
    aliasDisabled = '_disabled_',
    onClick = undefined,
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
            {
                list.map((item) => <ComboItem
                    key={item[aliasId]}
                    caption={item[aliasCaption]}
                    data={item}
                    onClick={onClick}
                    disabled={aliasDisabled in item ? item[aliasDisabled] : false}
                />)}
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
    aliasDisabled = ComboBox.global.aliasDisabled,
    ItemComponent = ComboBox.global.ItemComponent,

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
    const change = (data) => {
        setOpen(false);
        if (onChange) {
            onChange({ id, data });
        }
    };

    return (
        <>
            <div
                id={id}
                tabIndex="0"
                className={`${className} ${addClass}`}
                style={{ ...ComboBox.global.style, ...style }}
                onClick = {click}
                ref = {ref}
                title = {selectCaption || ''}
            >
                <ItemComponent
                    caption = {selectCaption || placeholder || ''}
                />
                <div/>
            </div>
            <Modal
                visible = {open}
                onClickShadow={closeList}
                opacityShadow={0}
            >
                <ComboList
                    list = {list}
                    {...size}
                    aliasId={aliasId}
                    aliasCaption={aliasCaption}
                    aliasDisabled={aliasDisabled}
                    onClick={change}
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
    ItemComponent: ComboItem,

    aliasId: 'id',
    aliasCaption: 'caption',
    aliasDisabled: '_disabled_',

};

export default ComboBox;
