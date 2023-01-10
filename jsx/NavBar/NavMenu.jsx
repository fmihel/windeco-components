import React, { useEffect, useState } from 'react';
import ModalDialog from '../ModalDialog/ModalDialog.jsx';
import global from '../global.js';
import screen from '../Utils/screen.js';
import onResizeScreen from '../Utils/onResizeScreen.js';

const checkMobile = () => screen().width <= global.wd_max_mobile_width;
function NavMenu({ caption, children }) {
    const [expand, setExpand] = useState(false);
    const [isMobile, setIsMobile] = useState(checkMobile());

    useEffect(() => {
        const removeResizeScreen = onResizeScreen(() => {
            setIsMobile(checkMobile());
        });

        return () => {
            removeResizeScreen();
        };
    }, []);

    const close = () => {
        setExpand(false);
    };
    const open = () => {
        setExpand(true);
    };

    return (
        <>
            <div className='wd-nav-menu' onClick={open}>
                <span>{caption}</span>
                <span>&#9660;</span>
                {(isMobile) ? <div style={{ paddingLeft: 20 }}>{children}</div> : undefined}
            </div>
            {(!isMobile)
            && <ModalDialog
                visible = {expand}
                opacityShadow={0}
                header={false}
                msg= ''
                onClickHeaderClose={close}
                onClickShadow={close}
                align='stickTo'
                stickAlign = 'screen-right-all'
            >
                {children}
            </ModalDialog>
            }
        </>
    );
}

export default NavMenu;
