/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import Collapse from './Collapse.jsx';
// import getId from './Utils/getId.js';
import DefaultLogo from './NavBar/NavLogo.jsx';
import { navbars } from './Utils/navbar.js';

function NavBar({
    id,
    className = NavBar.global.className,
    style = { ...NavBar.global.style },
    Logo = undefined,
    children,
}) {
    const [collapse, setCollapse] = useState(true);
    const childs = Array.isArray(children) ? children : [children];
    const ref = useRef();
    useEffect(() => {
        if (id) {
            navbars[`${id}`] = {
                ref, setCollapse, collapse,
            };
        }
    }, [ref]);
    const navBtnClick = () => {
        setCollapse(!collapse);
    };
    const typeLogo = typeof Logo;
    return (
        <div navbar=""
            {...id ? { id } : {}}
            {...className ? { className } : {}}
            style={{ ...NavBar.global.style, ...style }}
            ref = {ref}
        >
            <div nav-panel="">
                {typeLogo === 'string' && <DefaultLogo caption={Logo}/>}
                {typeLogo !== 'string' && Logo && <Logo/>}

                <div nav-empty=""></div>
                <div nav-btn="" onClick={navBtnClick}>&#8801;</div>
            </div>
            <div nav-menu="" {...(!collapse ? { expand: '' } : {})}>
                {childs}
            </div>
        </div>
    );
}

NavBar.global = {
    className: 'wd-navbar',
    style: {},
};

export default NavBar;
