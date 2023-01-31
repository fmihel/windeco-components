import React, { useEffect, useState } from 'react';
import NavItem, { isNavItem } from './NavItem.jsx';
import { isNavMenu } from './NavMenu.jsx';
import onResizeScreen from '../Utils/onResizeScreen';
import isCompact from '../Utils/isCompact';

let _collapse = [];
export const collapse = (p = undefined) => {
    if (p === undefined) {
        _collapse.map((close) => close());
    } else if (p.add) {
        _collapse.push(p.add);
    } else if (p.remove) {
        _collapse = _collapse.filter((it) => it === p.remove);
    }
};

function NavBar({
    Logo = undefined,
    className = NavBar.global.className,
    addClass = NavBar.global.addClass,
    style = NavBar.global.style,
    children,
}) {
    const [compact, setCompact] = useState(isCompact());
    const [itemsState, setItemsState] = useState('close');
    const toggleMenu = () => {
        setItemsState(itemsState === 'close' ? 'open' : 'close');
    };
    useEffect(() => {
        const close = () => {
            setItemsState('close');
        };
        collapse({ add: close });

        return () => {
            collapse({ remove: close });
        };
    }, []);

    useEffect(() => {
        const resize = () => {
            const current = isCompact();
            if (current !== compact) {
                setCompact(current);
                setItemsState('close');
            }
        };
        const removeResizeScreen = onResizeScreen(resize);
        resize();
        return () => {
            removeResizeScreen();
        };
    }, [compact]);

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
