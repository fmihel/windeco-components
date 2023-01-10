import React, { useState } from 'react';

function Nav({ children }) {
    const [itemsState, setItemsState] = useState('close');
    const toggleMenu = () => {
        setItemsState(itemsState === 'close' ? 'open' : 'close');
    };
    return (
        <div className='wd-nav' state={`${itemsState}`} >
            <div it='panel'>
                <div className="wd-nav-logo">Logo</div>
                <div className="wd-nav-btn" onClick={toggleMenu}>&#8801;</div>
            </div>
            <div it={'items'} className="wd-scrollbar">
                {children.map((it, key) => <div key={key}className='wd-nav-item'>{it}</div>)}
            </div>
        </div>
    );
}

export default Nav;
