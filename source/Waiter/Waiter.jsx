import React from 'react';
import { JX } from 'fmihel-browser-lib';
import './Waiter.scss';

export default class Waiter extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            w: 0,
            h: 0,
        };
        $(window).on('resize', () => {
            this.updatePos();
        });
    }

    componentDidMount() {
        this.updatePos();
    }

    updatePos() {
        this.setState(JX.screen());
    }

    render() {
        return (
            <div
                id="wd-waiter"
                className="wd-waiter"

                style={{
                    display: this.props.show ? 'block' : 'none',
                    position: 'absolute',
                    width: `${this.state.w}px`,
                    height: `${this.state.h}px`,
                    lineHeight: `${this.state.h}px`,
                    left: '0px',
                    top: '0px',
                    textAlign: 'center',

                }}
            >
                <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
        );
    }
}

Waiter.defaultProps = {
    show: false,
};
