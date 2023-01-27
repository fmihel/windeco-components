import React from 'react';

export function isNavItem(o) {
    return typeof o === 'function' && (o.name === 'NavItem' || o._originalClass === 'NavItem');
}
function NavItem({
    caption = undefined,
    link,
    className = NavItem.global.className,
    addClass = NavItem.global.addClass,
    style = NavItem.global.style,
    onClick = undefined,
    children,

}) {
    const click = () => {
        if (onClick) onClick({ link });
    };
    return (
        <div
            className={ `${className} ${addClass}`}
            style={{ ...NavItem.global.style, ...style }}
            onClick={click}
        >
            {caption || children || ''}
        </div>
    );
}
NavItem._originalClass = 'NavItem';

NavItem.global = {
    className: 'wd-nav-item',
    addClass: '',
    style: {},

};
export default NavItem;
