import React from 'react';

export default function Icon({
    src, icon, path,
    className = Icon.global.className,
    addClass = Icon.global.addClass,
    onClick = undefined,
    style = Icon.global.style,
    icons = Icon.global.icons,
}) {
    return (
        <img
            src={src || path || ((icons[icon] && icons[icon].src) ? icons[icon].src : false) || (icons[icon] && icons[icon].path ? icons[icon].path : false) || ''}
            className={className + (addClass ? ` ${addClass}` : '') + ((icons[icon] && icons[icon].addClass) ? ` ${icons[icon].addClass}` : '')}
            onClick={onClick}
            style={ { ...style } }
        />
    );
}

Icon.global = {
    icons: {}, // {name1:{src,addClass?},name2:{src,addClass?}...}
    addClass: '',
    className: 'wd-icon',
    style: {},
};
