/* eslint-disable camelcase */
import { binds, DOM, JX } from 'fmihel-browser-lib';
import React from 'react';
import Btn from '../Btn/Btn.jsx';

export default class ModalDialog extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            shadowPos: {
                left: 0, top: 0, width: 0, height: 0,
            },
            modalPos: {
                left: 0, top: 0, width: 0, height: 0,
            },

        };
        binds(this, 'resize', 'onClickFooterBtn', 'onClickShadow', 'onClickHeaderClose');
    }

    resize() {
        const s = JX.screen();
        this.setState((state) => ({
            shadowPos: {
                ...state.shadowPos,
                width: s.w,
                height: s.h,
            },
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
        } if (this.props.align === 'custom') {
            return {
                left: this.props.left,
                top: this.props.top,
                width: this.props.width,
                height: this.props.height,
            };
        } if (this.props.align === 'stickTo') {
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
            callback: undefined,
            addClass: '',
        };
        if (!Array.isArray(this.props.footer)) {
            if (typeof this.props.footer[key] === 'function') {
                param.callback = this.props.footer[key];
            } else {
                param = { ...param, ...this.props.footer[key] };
            }
        }
        return param[paramName];
    }

    onClickFooterBtn(key) {
        const callback = this._get_footer_param(key, 'callback');
        if (callback) callback({ sender: this });
        if (this.props.onClickFooterBtn) this.props.onClickFooterBtn({ sender: this, key });
    }

    render() {
        const {
            visible, children, header, footer, onClickHeaderClose,
        } = this.props;
        const { shadowPos, modalPos } = this.state;

        let footers = [];
        if (Array.isArray(footer)) {
            footers = footer;
        } else if (typeof footer === 'object') {
            footers = Object.keys(footer);
        }
        const displayShadow = visible ? 'block' : 'none';
        const displayModal = visible ? 'flex' : 'none';

        return (
            <>
                <div
                    style={{ ...shadowPos, display: displayShadow }}
                    className='wd-modal-dialog-shadow'
                    onClick={this.onClickShadow}

                >
                </div>

                <div
                    style={{ ...modalPos, display: displayModal }}
                    className="wd-modal"
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
        );
    }
}
ModalDialog.defaultProps = {
    visible: true,
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
        key: {
            addClass: 'wd-primary',
        },
    },
    align: 'stretch', // stretch, custom,stickTo
    stickTo: undefined, // DOM
    margin: 50, // for align = stretch
    left: 50, // for align = custom
    top: 50, // for align = custom
    width: 300, // for align = custom,stickTo
    height: 100, // for align = custom,stickTo

};
