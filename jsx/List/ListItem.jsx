import React from 'react';
import Gap from '../Gap/Gap.jsx';

export default function ListItem({
    id,
    caption,
    data,
    level,
    childs,
    className = ListItem.global.className,
    addClass = ListItem.global.addClass,
    active = false,
    expand = false,
    onClick = undefined,
    onDoubleClick = undefined,

}) {
    return (
        <Gap
            count ={level}
            addClass={`${className} ${addClass}`}
            attr={{
                ...(active ? { active: 'true' } : {}),
                ...(expand ? { expand: 'true' } : {}),
            }}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        >
            <div is='caption'>
                {caption}
            </div>
            {(childs && childs.length > 0) && <div is='icon'></div>}
        </Gap>
    );
}

ListItem.global = {
    className: 'wd-list-item',
    addClass: '',
};
