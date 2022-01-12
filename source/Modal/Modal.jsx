import { binds, DOM, JX } from 'fmihel-browser-lib';
import React from 'react';
import ReactDOM from 'react-dom';

// import { flex, binds } from 'fmihel-browser-lib'
export default class Modal extends React.Component {
    constructor(p) {
        super(p);
        this.el = document.createElement('div');
        this.state = {
            shadowPos: {
                left: 0, top: 0, width: 0, height: 0,
            },
        };
        binds(this, 'resize', 'onClickShadow');
    }

    onClickShadow() {
        if (this.props.onClickShadow) this.props.onClickShadow({ sender: this });
    }

    resize() {
        const s = JX.screen();
        this.setState((state) => ({
            shadowPos: {
                ...state.shadowPos,
                width: s.w,
                height: s.h,
            },

        }));
    }

    componentDidMount() {
        /*
          Элемент портала вставлен в дерево DOM после того, как потомки Modal
        были монтированы, что означает, что потомки будут монтированы в отдельный
        узел DOM.
          Если дочерний компонент требует присоединения к дереву DOM сразу после
        его монтирования, например, для измерения узла DOM или использования
        «autoFocus» в потомке, добавьте состояние в Modal и отрисуйте дочерние
        элементы, после того, как Modal будет вставлен в DOM дерево.
        */
        this.modalRoot = DOM(this.props.modalRoot);
        if (!this.modalRoot || this.modalRoot.length === 0) {
            const msg = `Cant find modal root for Modal component ! (finded by this.props.modalRoot="${this.props.modalRoot}")`;
            console.log('------------------------------------');
            console.log(msg);
            console.log('------------------------------------');
            throw new Error(msg);
        }
        this.modalRoot.appendChild(this.el);
        $(window).on('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
        $(window).off('resize', this.resize);
        this.modalRoot.removeChild(this.el);
    }

    render() {
        const {
            enableShadow, addClass,
            children, addShadowClass,
            shadowOpacity,
        } = this.props;

        const { shadowPos } = this.state;
        const opacityShadow = shadowOpacity !== 'css' ? { opacity: shadowOpacity } : {};

        return ReactDOM.createPortal(
            <div className={`wd-modal ${addClass}`} style={{ position: 'absolute', left: 0, top: 0 }}>
                {enableShadow && <div
                    className={`wd-shadow ${addShadowClass}`}
                    style={{ position: 'absolute', ...shadowPos, ...opacityShadow }}
                    onClick={this.onClickShadow}
                />}
                {children}
            </div>,
            this.el,
        );
    }
}
Modal.defaultProps = {
    modalRoot: '#wd-modal',
    enableShadow: true,
    addClass: '',
    onClickShadow: undefined,
    addShadowClass: '',
    shadowOpacity: 0.1, // num or 'css' if shadowOpacity === 'css'  opacity defined in wd-modal or addShadowClass class
};
