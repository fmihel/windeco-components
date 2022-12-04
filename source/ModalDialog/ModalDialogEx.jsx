import React, { useState, useEffect } from 'react';

import Modal from '../Modal/ModalEx.jsx';
import api from './ModalDialogAPI';
import Btn from '../Btn/Btn.jsx';
import mousePos from '../Utils/mouse';

function ModalDialog({
    id,
    visible = true,
    onClickHeaderClose = undefined,
    onClickShadow = undefined,
    onClickFooterBtn = undefined,
    onShow = undefined,
    header = false,
    footer = undefined,
    align = 'stretch', // stretch, custom,stickTo
    stickTo = undefined, // DOM or object {to:string | DOM
    stickAlign = 'bottom',
    stickOffX = 0,
    stickOffY = 0,
    margin = 50, // for align = stretch
    left = ModalDialog.global.left, // for align = custom
    top = ModalDialog.global.top, // for align = custom
    width = ModalDialog.global.width, // for align = custom,stickTo
    height = ModalDialog.global.height, // for align = custom,stickTo
    classShadow = Modal.global.classShadow,
    opacityShadow = Modal.global.opacityShadow,
    enableShadow = true,
    draggable = true, // work with align = custom || stickTo
    resizable = false,
    className = ModalDialog.global.className,
    addClass = ModalDialog.global.addClass,
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

    let footers = [];
    if (Array.isArray(footer)) {
        footers = footer;
    } else if (typeof footer === 'object') {
        footers = Object.keys(footer);
    }
    useEffect(() => {
        const resize = (first = false) => {
            if (!userModif) {
                const newPos = api.updatePos({
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
        window.addEventListener('resize', resize);
        resize(true);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [left, top, width, height, align, stickTo, stickOffX, stickOffY, stickAlign, margin, userModif]);

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
                    style={{ ...pos, ...size }}
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
                        &#10060;
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
                {resizable
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
    left: 0,
    top: 0,
    width: 300,
    height: 100,
    classShadow: 'wd-shadow',
    opacityShadow: false,

};
export default ModalDialog;
