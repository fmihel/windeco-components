/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Collapse from './Collapse.jsx';

export function NavItem2({
    id,
    caption,
    children,
    onClick,
}) {
    const [open, setOpen] = useState(false);
    const title = caption || (typeof children === 'string' ? children : false);

    const childs = Array.isArray(children) ? children : (typeof children === 'string' ? [] : [children]);
    const click = () => {
        if (childs.length) {
            const newOpen = !open;
            setOpen(newOpen);
            if (onClick) onClick({ id, open: newOpen, caption });
        }
    };

    return (
        <div nav-item="" {...(open ? { opened: '' } : {})}>
            {(title) && <div nav-caption="" onClick={click}>{title}</div>}
            {(open && title !== children) && children}
        </div>
    );
}
function NavBar2({
    children,
}) {
    const [collapse, setCollapse] = useState(true);
    const childs = Array.isArray(children) ? children : [children];

    const navBtnClick = () => {
        setCollapse(!collapse);
    };

    return (
        <div navbar="">
            <div nav-panel="">
                <div>Logo</div>
                <div nav-stretch=""></div>
                <div nav-btn="" onClick={navBtnClick}>...</div>
            </div>
            <div nav-menu="" {...(!collapse ? { expand: '' } : {})}>
                {childs}
            </div>
        </div>
    );
}

export default NavBar2;
