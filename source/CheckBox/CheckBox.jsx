/* eslint-disable import/no-extraneous-dependencies */
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
        if (ut.False(this.props.disabled)) {
            if (this.props.onChange) {
                if (!ut.toBool(this.props.asRadio) || o.target.checked) {
                    this.props.onChange({ id: this.props.id, checked: (o.target.checked ? 1 : 0) });
                }
            } else {
                this.setState({ checked: o.target.checked });
            }
        }
    }

    render() {
        const {
            visible, labelName, addClass, style, hint,
        } = this.props;
        const checked = ut.toBool((this.props.onChange ? this.props.checked : this.state.checked));
        const display = (visible ? 'flex' : 'none');
        const name = (labelName ? { id: labelName, name: labelName } : {});
        const inputStyle = {};
        if ('width' in style) {
            inputStyle.width = style.width;
            inputStyle.height = style.width;
            inputStyle.backgroundSize = style.width * 0.7;
        }

        return (
            <div style={{ display, ...style }} className="ch-frame" >
                <input
                    className={`checkbox ${addClass}`}
                    type="checkbox"
                    onChange = {this.onChange}
                    checked = {checked}
                    {...name}
                    style={inputStyle}
                    title={hint}
                />
            </div>
        );
    }
}
CheckBox.defaultProps = {
    id: undefined,
    labelName: undefined,
    caption: undefined,
    checked: false,
    asRadio: false, // если true то снятие галки возможно только через props и формироваться onChange при нажатии на галку не будет
    visible: 1,
    disabled: 0,
    onChange: undefined,
    addClass: '',
    style: {},
    hint: '',

};
