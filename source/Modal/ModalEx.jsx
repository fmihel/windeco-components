import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

let _root;
function getRoot() {
    // eslint-disable-next-line no-use-before-define
    if (!_root) _root = document.getElementById(Modal.global.idRoot) || document.getElementsByTagName('body')[0];
    console.log('root', _root);
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
    idRoot: 'wd-modal1',
    className: 'wd-modal',
    classShadow: 'wd-shadow',
};

export default Modal;
