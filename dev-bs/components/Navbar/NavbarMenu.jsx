import React from 'react';
import NavbarMenuItem from './NavbarMenuItem.jsx';
import collapse from './collapse';

export default ({ menu = [] }) => {
    const doCollapse = () => {
        // collapse();
    };
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent" onClick={doCollapse}>
            <ul className="navbar-nav mr-auto navbar-nav-scroll">
                {menu.map((item) => (<NavbarMenuItem key={item.id} id={item.id} caption={item.caption} active={item.active} onClick={item.onClick}/>))}
            </ul>

        </div>
    );
};
