import React, { useState, useRef, useEffect } from 'react';
import abs from '../Utils/abs';
import Modal from '../Modal/Modal.jsx';
import ComboList from './ComboList.jsx';
import ComboItem from './ComboItem.jsx';
import isMobile from '../Utils/isMobile';
import onResizeScreen from '../Utils/onResizeScreen';

function ComboBox({
    id,
    className = ComboBox.global.className,
    addClass = ComboBox.global.addClass,
    classNameList = ComboBox.global.classNameList,
    addClassList = ComboBox.global.addClassList,
    style = ComboBox.global.style,
    styleOuter = {},
    styleItem = {},
    list = [],
    /*
        list:[{ id, caption},{...},...]
    */
    disabled = false,
    required = false,
    select = false,
    onChange = undefined,
    hideBtnOnSelect = false,
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
    const [btnOpenShow, setBtnOpenShow] = useState(!hideBtnOnSelect);
    const [focused, setFocused] = useState(false);
    const [mobile, setMobile] = useState(isMobile());
    const ref = useRef(null);
    const [size, setSize] = useState({
        left: 0, top: 0, width: 0, height: 0,
    });
    useEffect(() => {
        const resize = () => {
            const ismobile = isMobile();
            if (ismobile !== mobile) {
                setMobile(ismobile);
            }
        };
        const removeResize = onResizeScreen(resize);
        return () => {
            removeResize();
        };
    }, [mobile]);

    useEffect(() => {
        if (open) {
            const out = {
                left: 0, top: 0, width: 0, height: 0,
            };

            const area = abs(ref.current);
            out.left = area.x;
            out.top = area.y;
            out.width = area.w;
            out.height = area.h;
            setSize(out);
        }
    }, [open]);

    const click = () => {
        setOpen(!open);
    };
    const closeList = () => {
        if (open) setOpen(false);
    };
    const change = (data) => {
        setOpen(false);
        if (onChange) {
            onChange({ id, data });
        }
    };
    const getItemClass = () => {
        if (onGetItemClass) {
            return onGetItemClass(selected, true);
        }
        return '';
    };
    const mouseMove = () => {
        if (hideBtnOnSelect) {
            setBtnOpenShow(true);
        }
    };
    const mouseLeave = () => {
        if (hideBtnOnSelect) {
            setBtnOpenShow(false);
        }
    };

    const focus = () => {
        setFocused(true);
    };
    const focusOut = () => {
        setFocused(false);
    };
    const keyDown = (o) => {
        if (o.keyCode === 9) {
            closeList();
        }
        if (o.keyCode === 27) {
            closeList();
            o.preventDefault();
        }
        if ([34, 33, 40, 38, 13].indexOf(o.keyCode) >= 0) {
            setOpen(true);
            o.preventDefault();
        }
    };
    return (
        <>
            <div
                id={id}

                className={`${className} ${addClass}`}
                style={{ ...ComboBox.global.style, ...style }}
                onClick = {click}
                ref = {ref}
                {...(disabled ? { disabled: true } : { tabIndex: '0' })}
                {...((required && !selected && !focused) ? { required: true } : { })}
                {...(open ? { open: true } : { })}
                onMouseMove={mouseMove}
                onMouseLeave={mouseLeave}
                onFocus={focus}
                onBlur={focusOut}
                onKeyDown={keyDown}

            >
                <ItemComponent
                    title={selectCaption || ''}
                    onGetItemClass = {getItemClass}
                    attr={{ state: (selected ? 'select' : 'no-select') }}
                    style={styleOuter}
                >
                    {selectCaption || placeholder || ''}
                </ItemComponent>
                <div style={ { ...((btnOpenShow || focused) ? {} : { display: 'none' }) }} />
            </div>
            {(!disabled) && <Modal
                visible = {open}
                onClickShadow={closeList}
                opacityShadow={0}
            >
                <ComboList
                    className={classNameList}
                    addClass={addClassList}
                    styleItem={styleItem}
                    list = {list}
                    {...size}
                    aliasId={aliasId}
                    aliasCaption={aliasCaption}
                    aliasDisabled={aliasDisabled}
                    onClick={change}
                    onGetItemClass = {onGetItemClass}
                    ItemComponent={ItemComponent}
                    mobile = {mobile}
                />
            </Modal>}
        </>
    );
}

ComboBox.global = {
    className: 'wd-combo',
    addClass: '',
    classNameList: 'wd-combo-list',
    addClassList: 'wd-scrollbar',
    placeholder: '- выбрать -',
    style: {},

    ItemComponent: ComboItem,
    onGetItemClass: undefined,

    aliasId: 'id',
    aliasCaption: 'caption',
    aliasDisabled: '_disabled_',

};

export default ComboBox;
