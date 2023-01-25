import React from 'react';

export function isNavItem(o) {
    return typeof o === 'function' && (o.name === 'NavItem' || o._originalClass === 'NavItem');
}
function NavItem({
    caption = undefined,
    link,
    className = 'wd-nav-item',
    onClick = undefined,
    children,

}) {
    const click = () => {
        if (onClick) onClick({ link });
    };
    return (
        <div
            className={`${className}`}
            onClick={click}
        >
            {caption || children || ''}
        </div>
    );
}
NavItem._originalClass = 'NavItem';

export default NavItem;
