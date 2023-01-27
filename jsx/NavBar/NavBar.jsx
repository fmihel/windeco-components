import React, { useState } from 'react';
import NavItem, { isNavItem } from './NavItem.jsx';
import { isNavMenu } from './NavMenu.jsx';

function NavBar({
    Logo = undefined,
    className = NavBar.global.className,
    addClass = NavBar.global.addClass,
    style = NavBar.global.style,
    children,
}) {
    const [itemsState, setItemsState] = useState('close');
    const toggleMenu = () => {
        setItemsState(itemsState === 'close' ? 'open' : 'close');
    };

    return (
        <div
            it='navbar'
            state={`${itemsState}`}
            className={ `${className} ${addClass}`}
            style={{ ...NavBar.global.style, ...style }}
        >
            <div it='nav-panel'>
                <div it="nav-logo">{Logo && <Logo/>}</div>
                <div it="nav-btn-close" className="wd-nav-btn" onClick={toggleMenu}>&#8801;</div>
            </div>
            <div it={'nav-items'} className="wd-scrollbar">
                {children.map((it, key) => ((isNavItem(it.type) || isNavMenu(it.type)) ? it : <NavItem key={key}>{it}</NavItem>))}
            </div>
        </div>
    );
}

NavBar.global = {
    className: 'wd-navbar',
    addClass: '',
    style: {},

};
export default NavBar;
