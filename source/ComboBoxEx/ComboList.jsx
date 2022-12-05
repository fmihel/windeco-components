import React from 'react';
import screen from '../Utils/screen';
import ComboItem from './ComboItem.jsx';

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
    ItemComponent = ComboItem,
    onGetItemClass = undefined,
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
                list.map((item) => (
                    <ItemComponent
                        key={item[aliasId]}
                        title={item[aliasCaption]}
                        data={item}
                        onClick={onClick}
                        onGetItemClass={onGetItemClass}
                        disabled={aliasDisabled in item ? item[aliasDisabled] : false}
                    >
                        {item[aliasCaption]}
                    </ItemComponent>
                ))}
        </div>
    );
}

export default ComboList;
