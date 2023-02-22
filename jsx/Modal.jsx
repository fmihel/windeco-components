import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import scr from './Utils/screen';

let _root;
function getRoot() {
    // eslint-disable-next-line no-use-before-define
    if (!_root) _root = document.getElementById(Modal.global.idRoot) || document.getElementsByTagName('body')[0];
    return _root;
}

function Modal({
    id,
    visible = true,
    className = Modal.global.className,
    enableShadow = true,
    classShadow = Modal.global.classShadow,
    onClickShadow = undefined,
    opacityShadow = Modal.global.opacityShadow,
    attr = {},
    children,
}) {
    const screenSize = () => { const s = scr(); /* s.width -= 1; s.height -= 1; */ return s; };
    const [screen, setScreen] = useState(scr());
    const [element] = useState(document.createElement('div'));
    const moveTop = () => { element.parentElement.insertBefore(element, null); };

    useEffect(() => {
        getRoot().appendChild(element);
        return () => {
            getRoot().removeChild(element);
        };
    }, []);

    useEffect(() => {
        const resize = () => {
            if (visible) {
                setScreen(screenSize());
            }
        };

        window.addEventListener('resize', resize);
        resize();

        if (visible) {
            moveTop();
        }
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [visible]);

    return ReactDOM.createPortal(
        <div
            id = {id}
            className={`${className}`}

            {...(visible ? { state: 'show' } : { state: 'hide' })}
            style={{
                position: 'absolute',
                left: 0,
                top: 0,

            }}
            {...attr}
        >
            {enableShadow
            && <div
                className={`${classShadow}`}
                style={{
                    position: 'absolute',
                    left: -1,
                    top: -1,
                    ...screen,
                    ...(opacityShadow === false ? {} : { opacity: opacityShadow }),
                }}
                onClick={onClickShadow}
            />}
            {children}
        </div>,
        element,
    );
}

Modal.global = {
    idRoot: 'wd-modal',
    className: 'wd-modal',
    classShadow: 'wd-shadow',
    opacityShadow: 0.4,
};

export default Modal;
