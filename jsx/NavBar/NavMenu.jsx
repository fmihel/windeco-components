import React, { useEffect, useRef, useState } from 'react';
import ModalDialog from '../ModalDialog/ModalDialog.jsx';
import global from '../global.js';
import screen from '../Utils/screen.js';
import onResizeScreen from '../Utils/onResizeScreen.js';
import NavItem, { isNavItem } from './NavItem.jsx';
import Gap from '../Gap/Gap.jsx';
import Collapse from '../Collapse/Collapse.jsx';
import areaDOM from '../Utils/areaDOM';
import size from '../Utils/size';

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
    expand: expanded = undefined,
    children,
}) {
    const [expand, setExpand] = useState(expanded !== undefined ? expanded : false);
    const [showAs, setShowAs] = useState(viewAs);
    const [mobile, setMobile] = useState(false);
    const [area, setArea] = useState({ width: 0, height: 0 });
    const dom = useRef(null);
    const frame = useRef(null);

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

    useEffect(() => {
        if (expand && showAs === 'popup' && frame.current) {
            setArea(size(frame.current));
        }
    }, [frame, showAs, expand]);

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
                <div it="nav-menu-head" onClick={toggle}>
                    <div>{caption}</div>
                    <div it="nav-menu-btn"></div>
                </div>
                {(showAs === 'list')
                    && <Collapse expand={expand} delay={100} attr={{ it: 'nav-menu-items' }} >
                        {children.map((it, key) => ((isNavItem(it.type) || isNavMenu(it.type)) ? it : <NavItem key={key}>{it}</NavItem>))}
                    </Collapse> }
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
                {...((showAs === 'popup' && dom.current) ? { stickTo: dom.current, stickAlign: 'left' } : {})}
                {...((showAs === 'popup' && area.height > 0) ? { height: 1.1 * area.height } : {})}
                draggable ={false}
                resizable = {false}
                // stickOffY = {32}
                // stickOffX = {-32}
            >
                <div ref={frame}>
                    {children.map((it, key) => ((isNavItem(it.type) || isNavMenu(it.type)) ? it : <NavItem key={key}>{it}</NavItem>))}
                </div>
            </ModalDialog>
            }
        </>
    );
}

NavMenu._originalClass = 'NavMenu';
export default NavMenu;
