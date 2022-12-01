import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

let _root;
function getRoot() {
    // eslint-disable-next-line no-use-before-define
    if (!_root) _root = document.getElementById(Modal.global.idRoot);
    return _root;
}

function Modal({
    id,
    visible = true,
    className = Modal.global.className,
    enableShadow = true,
    classShadow = Modal.global.classShadow,
    onClickShadow = undefined,
    children,
}) {
    const screenSize = () => ({ width: window.innerWidth, height: window.innerHeight });
    const [screen, setScreen] = useState(screenSize());
    const [element] = useState(document.createElement('div'));
    const moveTop = () => { element.parentElement.insertBefore(element, null); };

    const resize = () => {
        setScreen(screenSize());
    };
    useEffect(() => {
        getRoot().appendChild(element);
        window.addEventListener('resize', () => resize);
        return () => {
            window.removeEventListener('resize', resize);
            getRoot().removeChild(element);
        };
    }, []);

    useEffect(() => {
        if (visible) {
            moveTop();
        }
    }, [visible]);

    return ReactDOM.createPortal(
        <div
            id = {id}
            className={`${className}`}
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                ...(visible ? {} : { display: 'none' }),
            }}
        >
            {enableShadow
            && <div
                className={`${classShadow}`}
                style={{
                    position: 'absolute', left: 0, top: 0, ...screen,
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
};

export default Modal;
