import React, { useState, useEffect } from 'react';

import Modal from '../Modal/ModalEx.jsx';
import api from './ModalDialogAPI';

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
    const footers = [];
    const [pos, setPos] = useState({
        left, top, width, height,
    });
    const resize = (first = false) => {
        const newPos = api.updatePos({
            first, pos, left, top, width, height, align, stickTo, stickOffX, stickOffY, stickAlign, margin,
        });
        setPos(newPos);
    };
    const mouseMove = () => {

    };
    const mouseUp = () => {

    };
    const mouseDown = () => {

    };
    useEffect(() => {
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
        resize(true);
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
        };
    }, []);

    const mouseDownResize = () => {

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
                                id={this._get_footer_param(key, 'id')}
                                key={key} onClick={() => this.onClickFooterBtn(key)}
                                addClass={this._get_footer_param(key, 'addClass')}
                            >
                                {this._get_footer_param(key, 'caption')}
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
