import { binds, JX } from 'fmihel-browser-lib';
import React from 'react';
import './Modal.scss';
import Btn from '../Btn/Btn.jsx';

export default class Modal extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            shadowPos: {
                left: 0, top: 0, width: 0, height: 0,
            },
            modalPos: {
                left: 50, top: 50, width: 0, height: 0,
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
            modalPos: this.getModalPos(state.modalPos),
        }));
    }

    getModalPos(currentPos) {
        const s = JX.screen();
        return {
            ...currentPos,
            width: s.w - currentPos.left * 2,
            height: s.h - currentPos.top * 2,
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

    onClickFooterBtn(key) {
        if (this.props.footer[key]) this.props.footer[key]({ sender: this });
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
                    className='modal-shadow'
                    onClick={this.onClickShadow}

                >
                </div>

                <div
                    style={{ ...modalPos, display: displayModal }}
                    className="modal"
                >
                    {header && <div className="modal-header">
                        <div className="modal-header-caption">
                            {header}
                        </div>
                        {onClickHeaderClose && <div className="modal-header-close" onClick={this.onClickHeaderClose}>&#215;</div>}

                    </div>}
                    <div className="modal-content">
                        {children}
                    </div>

                    {footers.length > 0
                        && <div className="modal-footer">
                            {footers.map((key) => <Btn key={key} onClick={() => this.onClickFooterBtn(key)}>{key}</Btn>)}
                        </div>
                    }
                </div>
            </>
        );
    }
}
Modal.defaultProps = {
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

};
