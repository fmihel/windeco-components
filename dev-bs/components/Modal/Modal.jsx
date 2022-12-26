/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import modalData from './data';
import Btn from '../../../jsx/Btn/Btn.jsx';

function Modal({
    id, children,
    caption = '',
    buttons = {
        cancel: { caption: 'закрыть' },
    },
    scroll = true,
    align = 'center', // center stretch fullscreen  | custom class
    theme = 'light',

}) {
    const btns = Object.keys(buttons);
    const onClickBack = () => {
        modalData.err();
    };
    const onClickContent = (ev) => {
        ev.stopPropagation();
    };
    const onClickCloseBtn = () => {
        modalData.err();
    };
    const onClickBtn = (key) => {
        modalData.close();
        if (key === 'cancel') {
            modalData.err();
        } else {
            modalData.ok(key);
        }
    };
    const aligns = { center: 'modal-dialog-centered', stretch: 'modal-dialog-scrollable', fullscreen: 'modal-fullscreen' };
    const place = align in aligns ? aligns[align] : align;

    return (
        <div className={`modal fade ${theme}`} id={id} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true" onClick={onClickBack} >
            <div className={`modal-dialog ${place} ${scroll ? 'modal-dialog-scrollable' : ''} modal-lg`}>
                <div className={'modal-content '} onClick={onClickContent}>
                    { caption !== false
            && <div className="modal-header">
                <h5 className="modal-title" id={`${id}Label`}>{caption}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClickCloseBtn}></button>
            </div>
                    }
                    {caption === false
                    && <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClickCloseBtn}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 10,
                            zIndex: 1,
                            backgroundColor: `${theme === 'dark' ? 'gray' : 'white'}`,
                            border: `2px solid ${theme === 'dark' ? 'gray' : 'white'}`,
                        }}
                    ></button>
                    }
                    <div className="modal-body">
                        {children}
                    </div>
                    {buttons !== false
            && <div className="modal-footer">
                {btns.map((key) => {
                    const b = typeof buttons[key] === 'string' ? { caption: buttons[key] } : buttons[key];
                    const item = {
                        id: key,
                        key,
                        addClass: (b.addClass ? (` ${b.addClass}`) : ''),
                        caption: (b.caption || key),
                        onClick() {
                            if (!('disable' in b) || (b.disable !== true)) onClickBtn(key);
                        },
                    };
                    return (
                        <Btn
                            key={item.key}
                            id={key}
                            addClass={item.addClass}
                            onClick={item.onClick}
                        >
                            {item.caption}
                        </Btn>
                    );
                })}
                {
                /* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            */}
            </div>
                    }
                </div>

            </div>
        </div>
    );
}

export default Modal;
