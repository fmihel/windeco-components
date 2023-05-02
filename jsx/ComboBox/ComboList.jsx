import React from 'react';
import screen from '../Utils/screen';
import ComboItem from './ComboItem.jsx';
import global from '../global';
import ModalDialogAPI from '../ModalDialog/ModalDialogAPI';
import isMobile from '../Utils/isMobile';

function listPos({
    left, top, width, height, mobile,
}) {
    const scr = screen();
    if (mobile) {
        return ModalDialogAPI.updatePosMobile('center', 50, 100);
        // out.left = global.wd_gap * 2;
        // out.top = global.wd_gap * 2;
        // out.width = scr.width - global.wd_gap * 4;
        // out.height = scr.height - global.wd_gap * 4;
    }
    const out = {
        left, top, width, height,
    };
    out.height = 150;
    if (out.top + height + out.height > scr.height) {
        out.top -= out.height + 3;
    } else {
        out.top = top + height + 1;
    }
    return out;
}

function ComboList({
    list = [],
    left = 0,
    top = 0,
    width = 100,
    height = 100,
    className = '',
    styleItem = {},
    aliasId = 'id',
    aliasCaption = 'caption',
    aliasDisabled = '_disabled_',
    ItemComponent = ComboItem,
    onGetItemClass = undefined,
    onClick = undefined,
}) {
    return (
        <div
            combo-list=''
            className={`${className}`}
            style = {{
                ...listPos({
                    left,
                    top,
                    width,
                    height,
                    mobile: isMobile(),
                }),
            }}
        >
            {
                list.map((item) => (
                    <ItemComponent
                        key={item[aliasId]}
                        title={item[aliasCaption]}
                        data={item}
                        onClick={onClick}
                        onGetItemClass={onGetItemClass}
                        disabled={aliasDisabled in item ? item[aliasDisabled] : false}
                        style={styleItem}
                    >
                        {item[aliasCaption]}
                    </ItemComponent>
                ))}
        </div>
    );
}

export default ComboList;
