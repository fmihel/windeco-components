// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

const definingCssClass = 'wd-icon';

export default function Icon({
    src, icon, path,
    className = Icon.global.className,
    onClick = undefined,
    style = Icon.global.style,
    icons = Icon.global.icons,
}) {
    return (
        <img
            src={src || path || ((icons[icon] && icons[icon].src) ? icons[icon].src : false) || (icons[icon] && icons[icon].path ? icons[icon].path : false) || ''}
            className={definingCssClass + (className ? ` ${className}` : '') + ((icons[icon] && icons[icon].className) ? ` ${icons[icon].className}` : '')}
            onClick={onClick}
            style={ { ...style } }
        />
    );
}

Icon.global = {
    icons: {}, // {name1:{src,addClass?},name2:{src,addClass?}...}
    className: '',
    style: {},
};
