import React from 'react';

export default function ListItem({
    id,
    caption,
    data,
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
        <div
            className={`${className} ${addClass}`}
            onClick={click}
            {...(active ? { active: 'true' } : {})}
            {...(expand ? { expand: 'true' } : {})}
        >
            {caption}
        </div>
    );
}

ListItem.global = {
    className: 'wd-list-item',
    addClass: '',
};
