import React from 'react';

function NavContainer({
    className = NavContainer.global.className,
    style = { ...NavContainer.global.style },
    children,
}) {
    return (
        <div
            {...className ? { className } : {}}
            style={{ ...NavContainer.global.style, ...style }}
        >
            {children}
        </div>
    );
}

NavContainer.global = {
    className: 'wd-nav-container',
    style: {},
};

export default NavContainer;
