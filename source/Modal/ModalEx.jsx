import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { JX } from 'fmihel-browser-lib';

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
    const [screen, setScreen] = useState({ width: JX.screen().w, height: JX.screen().h });
    const [element] = useState(document.createElement('div'));

    const resize = () => {
        const s = JX.screen();
        setScreen({ width: s.w, height: s.h });
    };
    useEffect(() => {
        getRoot().appendChild(element);
        $(window).on('resize', resize);
        console.log('creare');
        return () => {
            $(window).off('resize', resize);
            getRoot().removeChild(element);
            console.log('delete');
        };
    }, []);

    const moveTop = () => {
        const parent = element.parentElement;
        parent.insertBefore(element, null);
    };
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
    idRoot: 'wd-modal2',
    className: 'wd-modal',
    classShadow: 'wd-shadow',
};

export default Modal;
