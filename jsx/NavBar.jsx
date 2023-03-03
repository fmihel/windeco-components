/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Collapse from './Collapse.jsx';
import getId from './Utils/getId.js';

function NavBar({
    id = getId('navbar'),
    children,
}) {
    const [collapse, setCollapse] = useState(true);
    const childs = Array.isArray(children) ? children : [children];

    const navBtnClick = () => {
        setCollapse(!collapse);
    };

    return (
        <div navbar="" id={id}>
            <div panel="">
                <div>Logo</div>
                <div empty-place=""></div>
                <div nav-btn="" onClick={navBtnClick}>...</div>
            </div>
            <div nav-menu="" {...(!collapse ? { expand: '' } : {})}>
                {childs}
            </div>
        </div>
    );
}

export default NavBar;
