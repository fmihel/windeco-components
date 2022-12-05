import React, { useState, useRef, useEffect } from 'react';
import abs from '../Utils/abs';
import Modal from '../Modal/ModalEx.jsx';
import ComboList from './ComboList.jsx';
import ComboItem from './ComboItem.jsx';

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
    onGetItemClass = ComboBox.global.onGetItemClass,
    placeholder = ComboBox.global.placeholder,
    aliasId = ComboBox.global.aliasId,
    aliasCaption = ComboBox.global.aliasCaption,
    aliasDisabled = ComboBox.global.aliasDisabled,
    ItemComponent = ComboBox.global.ItemComponent,

}) {
    const selected = list.find((item) => (item[aliasId] == select));
    const selectCaption = selected ? selected[aliasCaption] : false;

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
    const getItemClass = () => {
        if (onGetItemClass) {
            return onGetItemClass(selected);
        }
        return '';
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
            >
                <ItemComponent
                    title={selectCaption || ''}
                    onGetItemClass = {getItemClass}
                >
                    {selectCaption || placeholder || ''}
                </ItemComponent>
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
                    onGetItemClass = {onGetItemClass}
                    ItemComponent={ItemComponent}
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
    onGetItemClass: undefined,

    aliasId: 'id',
    aliasCaption: 'caption',
    aliasDisabled: '_disabled_',

};

export default ComboBox;
