import React, { useState, useEffect, useRef } from 'react';

import Modal from './Modal.jsx';
import api from './ModalDialog/ModalDialogAPI.js';
import Btn from './Btn.jsx';
import mousePos from '../utils/mouse.js';
import onResizeScreen from '../utils/onResizeScreen.js';
import isCompact from '../utils/isCompact.js';
import abs from '../utils/abs.js';

const definingCssClass = 'wd-modal-dialog';

function ModalDialog({
    id,
    visible = true,
    onClickHeaderClose = undefined,
    onClickShadow = undefined,
    onClickFooterBtn = undefined,
    header = false,
    footer = undefined,
    align = 'stretch', // stretch, custom,stickTo,center
    stickTo = undefined, // DOM  | string
    stickAlign = 'bottom', // bottom | left | screen-right-all
    stickOffX = 0,
    stickOffY = 0,
    margin = 50, // for align = stretch
    left = ModalDialog.global.left, // for align = custom
    top = ModalDialog.global.top, // for align = custom
    width = ModalDialog.global.width, // for align = custom,stickTo
    height = ModalDialog.global.height, // for align = custom,stickTo
    mobile = 'small', // false,large,middle,small,{center||top||bottom:<percent size>}
    classShadow = Modal.global.classShadow,
    enableShadow = true,
    draggable = true, // work with align = custom || stickTo
    resizable = false,
    className = ModalDialog.global.className,
    style = { ...ModalDialog.global.style },
    children,

}) {
    const [pos, setPos] = useState({
        left, top,
    });
    const [size, setSize] = useState({
        width, height,
    });

    const [mouseState, setMouseState] = useState(false);
    const [off, setOff] = useState({ x: 0, y: 0 });
    const [userModif, setUserModif] = useState(false);
    const [compact, setCompact] = useState(isCompact());
    const [visibility, setVisibility] = useState('hidden');
    // onst [visibility, setVisibility] = useState('visible');
    const refHeader = useRef();
    let footers = [];
    if (Array.isArray(footer)) {
        footers = footer;
    } else if (typeof footer === 'object') {
        footers = Object.keys(footer);
    }

    useEffect(() => {
        const resize = (first = false) => {
            const iscompact = isCompact();
            setCompact(iscompact);
            let newPos;
            if (mobile !== false && iscompact) {
                const mobObject = api.mobileToObject(mobile);
                newPos = api.updatePosMobile(mobObject.pos, mobObject.size, mobObject.width);
                setPos({ left: newPos.left, top: newPos.top });
                setSize({ width: newPos.width, height: newPos.height });
            } else if (!userModif) {
                newPos = api.updatePos({
                    first,
                    pos: { ...pos, ...size },
                    left,
                    top,
                    width,
                    height,
                    align,
                    stickTo,
                    stickOffX,
                    stickOffY,
                    stickAlign,
                    margin,
                });
                setPos({ left: newPos.left, top: newPos.top });
                setSize({ width: newPos.width, height: newPos.height });
            }
        };
        const removeResize = onResizeScreen(resize);
        resize(true);

        return () => {
            removeResize();
        };
    }, [visible, left, top, width, height, align, stickTo, stickOffX, stickOffY, stickAlign, userModif]);

    useEffect(() => {
        const mouseMove = () => {
            if (visible) {
                if (mouseState === 'resize') {
                    const mouse = mousePos();
                    setSize({
                        width: mouse.x + off.x,
                        height: mouse.y + off.y,
                    });
                } else if (mouseState === 'move') {
                    const mouse = mousePos();
                    setPos({
                        left: mouse.x - off.x,
                        top: mouse.y - off.y,
                    });
                }
            }
        };

        const mouseUp = () => {
            setMouseState(false);
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
        };
    }, [visible, mouseState, off]);

    useEffect(() => {
        if (visible) {
            if (visibility === 'hidden') {
                setVisibility('visible');
            }
        } else if (visibility === 'visible') { setVisibility('hidden'); }
    }, [visible, pos]);
    const mouseDown = ({ button }) => {
        if ((align === 'custom' || align === 'stickTo')
        && draggable && button === 0) {
            const mouse = mousePos();
            let need = true;
            if (draggable === 'header') {
                if (refHeader.current) {
                    const areaHeader = abs(refHeader.current);
                    need = ((mouse.x >= areaHeader.x && mouse.x <= areaHeader.x + areaHeader.w)
                            && (mouse.y >= areaHeader.y && mouse.y <= areaHeader.y + areaHeader.h));
                } else need = false;
            }
            if (need) {
                setOff({ x: mouse.x - pos.left, y: mouse.y - pos.top });
                setMouseState('move');
                if (!userModif) setUserModif(true);
            }
        }
    };
    const mouseDownResize = () => {
        const mouse = mousePos();
        setOff({ x: size.width - mouse.x, y: size.height - mouse.y });
        setMouseState('resize');
        if (!userModif) setUserModif(true);
    };
    const clickFooterBtn = (key) => {
        const onClick = api.getFooterParam(key, 'onClick', footer);
        if (onClick) {
            onClick({ sender: this, key });
        } else if (onClickFooterBtn) {
            onClickFooterBtn({ sender: this, key });
        }
    };

    return (
        <Modal
            id={id}
            visible={visible}
            classShadow= {classShadow}
            enableShadow={enableShadow}
            onClickShadow={onClickShadow}

        ><>
                <div

                    style={{
                        ...ModalDialog.global.style, ...style, ...pos, ...size, visibility,
                    }}
                    className={`${definingCssClass}${(className ? ` ${className}` : '')}`}
                    onMouseDown={mouseDown}
                >
                    {(header)
                    && <div dialog-header='' ref= {refHeader}>
                        <div dialog-caption=''>
                            {header}
                        </div>
                        {(onClickHeaderClose)
                        && <div dialog-close-btn='' onClick={onClickHeaderClose}>
                        &#10006;
                        </div>}

                    </div>
                    }
                    <div dialog-content=''>
                        {children}
                    </div>
                    {(footers.length > 0)
                        && <div dialog-footer=''>
                            {footers.map((key) => <Btn
                                id={api.getFooterParam(key, 'id', footer)}
                                key={key} onClick={() => clickFooterBtn(key)}
                                className={api.getFooterParam(key, 'className', footer)}
                            >
                                {api.getFooterParam(key, 'caption', footer)}
                            </Btn>)
                            }
                        </div>
                    }
                </div>
                {resizable && !compact
                && <div dialog-resize=''
                    style={{
                        left: pos.left + size.width,
                        top: pos.top + size.height,
                    }}>
                    <div
                        onMouseDown={mouseDownResize}
                    ></div>
                </div>
                }

            </>
        </Modal>
    );
}

ModalDialog.global = {
    className: 'wd-dialog-slide-from-top',
    classShadow: 'wd-shadow',
    style: {},
    left: 0,
    top: 0,
    width: 300,
    height: 100,

};
export default ModalDialog;
