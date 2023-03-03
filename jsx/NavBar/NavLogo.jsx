import React from 'react';

function NavLogo({
    className = NavLogo.global.className,
    style = NavLogo.global.style,
    caption = NavLogo.global.caption,
    children,
}) {
    return (
        <div
            {...className ? { className } : {}}
            style={{ ...NavLogo.global.style, ...style }}
        >
            {(caption) && caption }
            {children}
        </div>
    );
}

NavLogo.global = {
    className: 'wd-nav-logo',
    addClass: '',
    style: {},
    caption: 'logo',

};

export default NavLogo;
