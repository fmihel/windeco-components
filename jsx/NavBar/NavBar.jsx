import React, { useState } from 'react';
import NavItem, { isNavItem } from './NavItem.jsx';
import { isNavMenu } from './NavMenu.jsx';

function NavBar({
    LogoComponent = undefined,
    children,
}) {
    const [itemsState, setItemsState] = useState('close');
    const toggleMenu = () => {
        setItemsState(itemsState === 'close' ? 'open' : 'close');
    };

    return (
        <div it='navbar' className='wd-navbar' state={`${itemsState}`} >
            <div it='panel'>
                <div it="logo">{LogoComponent && <LogoComponent/>}</div>
                <div it="btn" className="wd-nav-btn" onClick={toggleMenu}>&#8801;</div>
            </div>
            <div it={'items'} className="wd-scrollbar">
                {children.map((it, key) => ((isNavItem(it.type) || isNavMenu(it.type)) ? it : <NavItem key={key}>{it}</NavItem>))}
            </div>
        </div>
    );
}

export default NavBar;
