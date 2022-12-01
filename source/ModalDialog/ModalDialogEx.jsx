import React, { useState, useEffect } from 'react';

import Modal from '../Modal/ModalEx.jsx';
import api from './ModalDialogAPI';
import Btn from '../Btn/Btn.jsx';

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
    addShadowClass = '',
    shadowOpacity = 0.1, // num or 'css' if shadowOpacity === 'css'  opacity defined in wd-modal class
    shadowEnable = true,
    draggable = true, // work with align = custom || stickTo
    resizable = false,
    className = ModalDialog.global.className,
    addClass = ModalDialog.global.addClass,
    children,

}) {
    const [pos, setPos] = useState({
        left, top, width, height,
    });
    const [cursor, setCursor] = useState({
        state: false,
        mouse: { x: -1, y: -1 },
        pressed: -1,
    });

    const resize = (first = false) => {
        const newPos = api.updatePos({
            first, pos, left, top, width, height, align, stickTo, stickOffX, stickOffY, stickAlign, margin,
        });
        setPos(newPos);
    };

    let footers = [];
    if (Array.isArray(footer)) {
        footers = footer;
    } else if (typeof footer === 'object') {
        footers = Object.keys(footer);
    }

    useEffect(() => {
        const mouseMove = () => {
            if (visible) {
                console.log(id, visible);
                console.log('mouse move', cursor);
                if (cursor.state === 'resize') {
                    const mouse = api.mouse();
                    setPos({
                        ...pos,
                        width: pos.width + (mouse.x - cursor.mouse.x),
                        height: pos.height + (mouse.y - cursor.mouse.y),
                    });
                    setCursor({ ...cursor, mouse });
                } else if ((align === 'custom' || align === 'stickTo')
            && draggable && cursor.pressed === 0) {
                    const mouse = api.mouse();
                    setPos({
                        ...pos,
                        left: pos.left + mouse.x - cursor.mouse.x,
                        top: pos.top + mouse.y - cursor.mouse.y,
                    });

                    setCursor({ ...cursor, mouse });
                }
            }
        };

        const mouseUp = () => {
            setCursor({ state: false, pressed: undefined, moyuse: { x: 0, y: 0 } });
        };
        console.log('create');
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
        resize(true);

        return () => {
            console.log('destroy');
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
        };
    }, [visible, align]);

    const mouseDown = ({ button }) => {
        if ((align === 'custom' || align === 'stickTo')
        && draggable && button === 0) {
            setCursor({ ...cursor, mouse: api.mouse(), pressed: 0 });
        }
    };
    const mouseDownResize = () => {
        setCursor({ ...cursor, state: 'resize', mouse: api.mouse() });
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
            onClickShadow={onClickShadow}
        ><>
                <div
                    style={{ ...pos }}
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
                        left: pos.left + pos.width,
                        top: pos.top + pos.height,
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

};
export default ModalDialog;
