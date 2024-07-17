import React from 'react';
import screen from '../../utils/screen';
import ComboItem from './ComboItem.jsx';
import ModalDialogAPI from '../ModalDialog/ModalDialogAPI';
import isMobile from '../../utils/isMobile';

function listPos({
    left, top, width, height, mobile, itemsCount, itemHeight,
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
    out.height = Math.max(Math.min(scr.height, (itemsCount) * (itemHeight + 1) + itemHeight / 2), height);

    if (out.top + height + out.height > scr.height) {
        if (out.top > scr.height / 2) {
            out.height = Math.min(out.height, out.top) - 2;
            out.top -= (out.height + 2);
        } else {
            out.top = top + height + 1;
            out.height = scr.height - out.top;
        }
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
    select = false,
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
                    itemsCount: list.length,
                    itemHeight: 32,
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
                        active={select !== false && `${select}` === `${item[aliasId]}`}
                    >
                        {item[aliasCaption]}
                    </ItemComponent>
                ))}
        </div>
    );
}

export default ComboList;
