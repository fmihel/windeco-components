import React from 'react';

function NavLogo({
    className = NavLogo.global.className,
    addClass = NavLogo.global.addClass,
    style = NavLogo.global.style,
    children,
}) {
    return (
        <div className={ `${className} ${addClass}`}
            style={{ ...NavLogo.global.style, ...style }}
        >
            {children}
        </div>
    );
}

NavLogo.global = {
    className: 'wd-nav-logo',
    style: {},
};

export default NavLogo;
