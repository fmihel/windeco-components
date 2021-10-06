/* eslint-disable import/no-extraneous-dependencies */
import './CheckBox.scss';
import React from 'react';
import { binds, ut } from 'fmihel-browser-lib';

export default class CheckBox extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            checked: this.props.checked,
        };
        binds(this, 'onChange');
    }

    onChange(o) {
        if (this.props.onChange) {
            if (!this.props.asRadio || o.target.checked) {
                this.props.onChange({ id: this.props.id, checked: (o.target.checked ? 1 : 0) });
            }
        } else {
            this.setState({ checked: o.target.checked });
        }
    }

    render() {
        const { visible, labelName } = this.props;
        const checked = ut.toBool((this.props.onChange ? this.props.checked : this.state.checked));
        const display = (visible ? 'flex' : 'none');
        const name = (labelName ? { id: labelName, name: labelName } : {});

        return (
            <div style={{ display }} className="ch-frame">
                <input
                    className="checkbox"
                    type="checkbox"
                    onChange = {this.onChange}
                    checked = {checked}
                    {...name}
                />
            </div>
        );
    }
}
CheckBox.defaultProps = {
    labelName: undefined,
    caption: undefined,
    checked: false,
    asRadio: false, // если true то снятие галки возможно только через props и формироваться onChange при нажатии на галку не будет
    visible: 1,
    disable: 0,
    onChange: undefined,

};
