import React, { useState } from 'react';
import NavLogo from './NavLogo.jsx';

function NavBar({
    LogoComponent = undefined,
    children,
}) {
    const [itemsState, setItemsState] = useState('close');
    const toggleMenu = () => {
        setItemsState(itemsState === 'close' ? 'open' : 'close');
    };
    return (
        <div className='wd-nav' state={`${itemsState}`} >
            <div it='panel'>
                {LogoComponent ? <LogoComponent/> : <NavLogo/>}
                <div className="wd-nav-btn" onClick={toggleMenu}>&#8801;</div>
            </div>
            <div it={'items'} className="wd-scrollbar">
                {children.map((it, key) => <div
                    key={key}
                    className='wd-nav-item'
                >
                    {it}
                </div>)}
            </div>
        </div>
    );
}

export default NavBar;
