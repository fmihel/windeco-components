import React, { useEffect, useRef, useState } from 'react';
import ModalDialog from '../ModalDialog/ModalDialog.jsx';
import global from '../global.js';
import screen from '../Utils/screen.js';
import onResizeScreen from '../Utils/onResizeScreen.js';
import NavItem, { isNavItem } from './NavItem.jsx';
import Gap from '../Gap/Gap.jsx';

export function isNavMenu(o) {
    return typeof o === 'function' && (o.name === 'NavMenu' || o._originalClass === 'NavMenu');
}

const isMobile = () => screen().width <= global.wd_max_mobile_width;
const getViewAs = (viewAs, mobile) => {
    const out = viewAs.split('/');
    return (out.length > 1 && !mobile) ? out[1] : out[0];
};
function NavMenu({
    caption,
    viewAs = 'list/popup', // popup | panel | list -  можно задавать сразу два параметра в строке через слеш, первый для мобильной версии второй для обычной list/popup
    children,
}) {
    const [expand, setExpand] = useState(false);
    const [showAs, setShowAs] = useState(viewAs);
    const [mobile, setMobile] = useState(false);
    const dom = useRef(null);

    useEffect(() => {
        const resize = () => {
            setMobile(isMobile());
        };
        const removeResizeScreen = onResizeScreen(resize);
        resize();
        return () => {
            removeResizeScreen();
        };
    }, []);

    useEffect(() => {
        setShowAs(getViewAs(viewAs, mobile));
    }, [viewAs, mobile]);

    const close = () => {
        setExpand(false);
    };
    const toggle = (ev) => {
        if (showAs === 'list') {
            setExpand(!expand);
        } else {
            setExpand(true);
        }
        ev.stopPropagation();
    };
    return (
        <>
            <div className='wd-nav-menu' ref={dom} it="nav-menu" {...(expand ? { expand: 'expand' } : {})}>
                <div it="title" onClick={toggle}>
                    <div>{caption}</div>
                    <div it="btn"></div>
                </div>
                {(showAs === 'list')
                    && <Gap >
                        <div it="list">
                            {children.map((it, key) => ((isNavItem(it.type) || isNavMenu(it.type)) ? it : <NavItem key={key}>{it}</NavItem>))}
                        </div>
                    </Gap>}
            </div>
            {((showAs === 'popup') || showAs === 'panel')
            && <ModalDialog
                visible = {expand}
                opacityShadow={0}
                header={false}
                msg= ''
                onClickHeaderClose={close}
                onClickShadow={close}
                {...((showAs === 'panel' || dom.current) ? { align: 'stickTo' } : { align: 'custom' })}
                {...(showAs === 'panel' ? { stickAlign: 'screen-right-all' } : {})}
                {...((showAs === 'popup' && dom.current) ? { stickTo: dom.current } : {})}
                draggable ={false}
                resizable = {false}
            >
                {children.map((it, key) => ((isNavItem(it.type) || isNavMenu(it.type)) ? it : <NavItem key={key}>{it}</NavItem>))}
            </ModalDialog>
            }
        </>
    );
}

NavMenu._originalClass = 'NavMenu';
export default NavMenu;
