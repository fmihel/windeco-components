import React, { useState, useEffect } from 'react';

import Modal from '../Modal/Modal.jsx';
import api from './ModalDialogAPI';
import Btn from '../Btn/Btn.jsx';
import mousePos from '../Utils/mouse';
import onResizeScreen from '../Utils/onResizeScreen.js';
import isCompact from '../Utils/isCompact.js';

function ModalDialog({
    id,
    visible = true,
    onClickHeaderClose = undefined,
    onClickShadow = undefined,
    onClickFooterBtn = undefined,
    header = false,
    footer = undefined,
    align = 'stretch', // stretch, custom,stickTo
    stickTo = undefined, // DOM  | string
    stickAlign = 'bottom', // bottom | left | screen-right-all
    stickOffX = 0,
    stickOffY = 0,
    margin = 50, // for align = stretch
    left = ModalDialog.global.left, // for align = custom
    top = ModalDialog.global.top, // for align = custom
    width = ModalDialog.global.width, // for align = custom,stickTo
    height = ModalDialog.global.height, // for align = custom,stickTo
    mobile = { top: 30 }, // false,large,middle,small,{center||top||bottom:<percent size>}
    classShadow = Modal.global.classShadow,
    opacityShadow = Modal.global.opacityShadow,
    enableShadow = true,
    draggable = true, // work with align = custom || stickTo
    resizable = false,
    className = ModalDialog.global.className,
    addClass = ModalDialog.global.addClass,
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

    const mouseDown = ({ button }) => {
        if ((align === 'custom' || align === 'stickTo')
        && draggable && button === 0) {
            const mouse = mousePos();
            setOff({ x: mouse.x - pos.left, y: mouse.y - pos.top });
            setMouseState('move');
            if (!userModif) setUserModif(true);
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
            opacityShadow={opacityShadow}
            enableShadow={enableShadow}
            onClickShadow={onClickShadow}

        ><>
                <div
                    style={{
                        ...ModalDialog.global.style, ...style, ...pos, ...size,
                    }}
                    className={`${className} ${addClass}`}
                    onMouseDown={mouseDown}
                >
                    {(header)
                    && <div className="wd-dialog-header">
                        <div className="wd-dialog-caption">
                            {header}
                        </div>
                        {(onClickHeaderClose)
                        && <div className="wd-dialog-close-btn" onClick={onClickHeaderClose}>
                        &#10006;
                        </div>}

                    </div>
                    }
                    <div className="wd-dialog-content">
                        {children}
                    </div>
                    {(footers.length > 0)
                        && <div className="wd-dialog-footer">
                            {footers.map((key) => <Btn
                                id={api.getFooterParam(key, 'id', footer)}
                                key={key} onClick={() => clickFooterBtn(key)}
                                addClass={api.getFooterParam(key, 'addClass', footer)}
                            >
                                {api.getFooterParam(key, 'caption', footer)}
                            </Btn>)
                            }
                        </div>
                    }
                </div>
                {resizable && !compact
                && <div className="wd-dialog-resize"
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
    className: 'wd-dialog',
    addClass: '',
    style: {},
    left: 0,
    top: 0,
    width: 300,
    height: 100,
    classShadow: 'wd-shadow',
    opacityShadow: false,

};
export default ModalDialog;
