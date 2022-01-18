/* eslint-disable camelcase */
import { binds, DOM, JX } from 'fmihel-browser-lib';
import React from 'react';
import Btn from '../Btn/Btn.jsx';
import Modal from '../Modal/Modal.jsx';

export default class ModalDialog extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            modalPos: {
                left: 0, top: 0, width: -1, height: -1,
            },

        };

        binds(this, 'resize', 'onClickFooterBtn', 'onClickShadow', 'onClickHeaderClose',
            'onMouseDown', 'onMouseUp', 'onMouseLeave', 'onMouseMove');
    }

    resize() {
        const s = JX.screen();
        this.setState((state) => ({
            modalPos: this.getModalPos(),
        }));
    }

    _margin() {
        const { margin } = this.props;
        const isObject = (typeof (margin) === 'object');
        return {
            left: isObject ? (margin.left || 0) : margin,
            right: isObject ? (margin.right || 0) : margin,
            top: isObject ? (margin.top || 0) : margin,
            bottom: isObject ? (margin.bottom || 0) : margin,

        };
    }

    getModalPos() {
        const screen = JX.screen();
        if (this.props.align === 'stretch') {
            const margin = this._margin();
            return {
                left: margin.left,
                top: margin.top,
                width: screen.w - (margin.left + margin.right),
                height: screen.h - (margin.top + margin.bottom),
            };
        } if (this.props.align === 'custom' || (this.props.align === 'stickTo' && this.props.draggable && this.state.modalPos.width !== -1)) {
            return this.state.modalPos.width === -1 ? {
                left: this.props.left,
                top: this.props.top,
                width: this.props.width,
                height: this.props.height,
            } : this.state.modalPos;
        } if (this.props.align === 'stickTo' && (!this.props.draggable || this.state.modalPos.width === -1)) {
            const stickTo = typeof this.props.stickTo === 'string' ? DOM(this.props.stickTo) : this.props.stickTo;
            const abs = JX.abs(stickTo);
            const pos = {
                left: abs.x + abs.w / 2 - this.props.width / 2,
                top: abs.y + abs.h,
                width: this.props.width,
                height: this.props.height,
            };
            if (pos.left + pos.width > screen.w) pos.left = screen.w - pos.width;
            if (pos.left < 0) pos.left = 0;
            if (pos.top + pos.height > screen.h) pos.top = abs.y - pos.height;
            if (pos.top < 0) pos.top = 0;

            return pos;
        }
        return {
            left: 10, top: 10, width: 100, height: 100,
        };
    }

    componentDidMount() {
        $(window).on('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
        $(window).off('resize', this.resize);
    }

    onClickHeaderClose() {
        if (this.props.onClickHeaderClose) this.props.onClickHeaderClose({ sender: this });
    }

    onClickShadow() {
        if (this.props.onClickShadow) this.props.onClickShadow({ sender: this });
    }

    _get_footer_param(key, paramName) {
        let param = {
            key,
            id: undefined,
            caption: key,
            onClick: undefined,
            addClass: '',
        };
        if (!Array.isArray(this.props.footer)) {
            if (typeof this.props.footer[key] === 'function') {
                param.onClick = this.props.footer[key];
            } else {
                param = { ...param, ...this.props.footer[key] };
            }
        }
        return param[paramName];
    }

    onClickFooterBtn(key) {
        const onClick = this._get_footer_param(key, 'onClick');
        if (onClick) {
            onClick({ sender: this, key });
        } else if (this.props.onClickFooterBtn) {
            this.props.onClickFooterBtn({ sender: this, key });
        }
    }

    onMouseDown(o) {
        if ((this.props.align === 'custom' || this.props.align === 'stickTo') && this.props.draggable && o.button === 0) {
            this.pressed = 0;
            this.coord = JX.mouse();
        }
    }

    onMouseMove(o) {
        if ((this.props.align === 'custom' || this.props.align === 'stickTo') && this.props.draggable && this.pressed === 0) {
            const current = JX.mouse();
            const pos = this.state.modalPos;
            if ((current.x - this.coord.x !== 0) || (current.y - this.coord.y !== 0)) {
                this.culcPos = false;
            }
            this.setState({
                modalPos: {
                    ...pos,
                    left: pos.left + current.x - this.coord.x,
                    top: pos.top + current.y - this.coord.y,
                },
            });

            this.coord = current;
        }
    }

    onMouseUp() {
        this.pressed = undefined;
    }

    onMouseLeave() {
        this.onMouseUp();
    }

    render() {
        const {
            visible, children, header, footer, onClickHeaderClose, shadowEnable,
            shadowOpacity, addShadowClass,
        } = this.props;
        const { modalPos } = this.state;

        let footers = [];
        if (Array.isArray(footer)) {
            footers = footer;
        } else if (typeof footer === 'object') {
            footers = Object.keys(footer);
        }
        // const displayShadow = visible ? 'block' : 'none';
        const displayModal = visible ? 'flex' : 'none';
        // const opacityShadow = shadowOpacity !== 'css' ? { opacity: shadowOpacity } : {};
        /* return (
            <>
                {shadowEnable
                && <div
                    style={{ ...shadowPos, display: displayShadow, ...opacityShadow }}
                    className='wd-modal-dialog-shadow'
                    onClick={this.onClickShadow}

                >
                </div>
                }

                <div
                    style={{ ...modalPos, display: displayModal }}
                    className="wd-modal-dialog"
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseLeave={this.onMouseLeave}
                    onMouseMove={this.onMouseMove}
                >
                    {header && <div className="wd-modal-dialog-header">
                        <div className="wd-modal-dialog-header-caption">
                            {header}
                        </div>
                        {onClickHeaderClose && <div className="wd-modal-dialog-header-close" onClick={this.onClickHeaderClose}>&#10060;</div>}

                    </div>}
                    <div className="wd-modal-dialog-content">
                        {children}
                    </div>

                    {footers.length > 0
                        && <div className="wd-modal-dialog-footer">
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
            </>
        ); */

        return <Modal
            enableShadow={visible && shadowEnable}
            onClickShadow={this.onClickShadow}
            shadowOpacity={shadowOpacity}
            addShadowClass={addShadowClass}
        >
            <div
                style={{ ...modalPos, display: displayModal }}
                className="wd-modal-dialog"
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseLeave={this.onMouseLeave}
                onMouseMove={this.onMouseMove}
            >
                {header && <div className="wd-modal-dialog-header">
                    <div className="wd-modal-dialog-header-caption">
                        {header}
                    </div>
                    {onClickHeaderClose && <div className="wd-modal-dialog-header-close" onClick={this.onClickHeaderClose}>&#10060;</div>}

                </div>}
                <div className="wd-modal-dialog-content">
                    {children}
                </div>

                {footers.length > 0
                        && <div className="wd-modal-dialog-footer">
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

        </Modal>;
    }
}
ModalDialog.defaultProps = {
    visible: true, // сурывает (НЕ УДАЛЯЕТ) объект
    onClickHeaderClose: undefined,
    onClickShadow: undefined,
    onClickFooterBtn: undefined,
    header: false,
    footer: undefined,
    footer_example: {
        ok: undefined,
        cancel: undefined,
    },
    footer_example2: [
        'ok', 'cancel',
    ],
    footer_example3: {
        ok: {
            addClass: 'wd-primary',
        },
        cancel: {
            id: 'btn-cancel',
            onClick(o) { console.log(o); },
        },
    },
    align: 'stretch', // stretch, custom,stickTo
    stickTo: undefined, // DOM
    margin: 50, // for align = stretch
    left: 50, // for align = custom
    top: 50, // for align = custom
    width: 300, // for align = custom,stickTo
    height: 100, // for align = custom,stickTo
    addShadowClass: '',
    shadowOpacity: 0.1, // num or 'css' if shadowOpacity === 'css'  opacity defined in wd-modal class
    shadowEnable: true,
    draggable: true, // work with align = custom || stickTo

};
