import React from 'react';
import Gap from '../Gap/Gap.jsx';

export default function ListItem({
    id,
    caption,
    data,
    level,
    className = ListItem.global.className,
    addClass = ListItem.global.addClass,
    active = false,
    expand = false,
    onClick = undefined,
    onChange = undefined,

}) {
    const click = () => {
        if (onClick) onClick({ id, data });
        if (onChange) {
            onChange({
                id, active: !active, expand: !expand, data,
            });
        }
    };
    return (
        <Gap
            count ={level}
            addClass={`${className} ${addClass}`}
            attr={{
                ...(active ? { active: 'true' } : {}),
                ...(expand ? { expand: 'true' } : {}),
            }}
        >
            <div
                onClick={click}
            >
                {caption}
            </div>
        </Gap>
    );
}

ListItem.global = {
    className: 'wd-list-item',
    addClass: '',
};
