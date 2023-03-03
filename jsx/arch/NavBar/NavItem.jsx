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
    const text = () => {
        if (caption) {
            return typeof caption === 'string' ? <span it="cap">{caption}</span> : caption;
        } if (children) {
            return typeof children === 'string' ? <span it="cap">{children}</span> : children;
        }
        return '';
    };
    return (
        <div
            className={ `${className} ${addClass}`}
            style={{ ...NavItem.global.style, ...style }}
            onClick={click}
        >
            {text()}
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
