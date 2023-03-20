import React from 'react';
import Gap from '../Gap/Gap.jsx';

export default function ListItem({
    caption,
    level,
    childs,
    className = ListItem.global.className,
    active = false,
    expand = false,
    onClick = undefined,
    onDoubleClick = undefined,

}) {
    return (
        <Gap
            count ={level}
            addClass={`${className} `}
            attr={{
                ...(active ? { active: '' } : {}),
                ...(expand ? { expand: '' } : {}),
            }}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        >
            <div caption=''>
                {caption}
            </div>
            {(childs && childs.length > 0) && <div icon=''></div>}
        </Gap>
    );
}

ListItem.global = {
    className: 'wd-list-item',
};
