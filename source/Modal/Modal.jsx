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
        this.modalRoot.appendChild(this.el);
        $(window).on('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
        $(window).off('resize', this.resize);
        this.modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            <div className={`wd-modal ${this.props.addClass}`} style={{ position: 'absolute', left: 0, top: 0 }}>
                {this.props.enableShadow && <div
                    className='wd-shadow'
                    style={{ position: 'absolute', ...this.state.shadowPos }}
                    onClick={this.onClickShadow}
                >
                </div>
                }
                {this.props.children}
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

};
