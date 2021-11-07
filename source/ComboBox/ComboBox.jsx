/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { binds, ut } from 'fmihel-browser-lib';
import ComboBoxItem from './ComboBoxItem.jsx';

export default class ComboBox extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onChange');
        this.state = {
            id: (this.props.id === '' ? `cb-${ut.random_str(5)}` : this.props.id),
            select: (this.props.select !== undefined ? this.props.select : -1),
        };
    }

    onChange(a) {
        this.hash = this.props.hash;
        // console.log('combobox change', { id: this.state.id, select: a.currentTarget.value });
        this.setState({
            select: a.currentTarget.value,
        });
        if (this.props.onChange) {
            this.props.onChange({ id: this.state.id, select: a.currentTarget.value });
        }
    }

    _normalizeData(data, idName = 'id') {
        return data.map((item, i) => {
            if ((typeof item !== 'object')) {
                return { [idName]: i, caption: item };
            }
            return item;
        });
    }

    componentDidUpdate() {
        if (this.props.hash && this.hash !== this.props.hash) {
            this.hash = this.props.hash;
            this.setState({ select: this.props.select });
        }
    }

    render() {
        const {
            idFieldName, visible, placeholder, disable, dim, labelName, addClass,
        } = this.props;
        const { id } = this.state;
        const display = (visible ? 'flex' : 'none');
        const list = this._normalizeData(this.props.list, idFieldName);
        const name = (labelName ? { id: labelName } : {});
        const { select } = this.state;

        return (
            <div className='wd-combobox-frame' id={id} style={{ display }}>
                <select
                    className = {`wd-combobox ${addClass}`}
                    value={select}
                    onChange ={this.onChange}
                    {...name}
                >
                    { typeof placeholder === 'string' && <option disabled value={-1}> {placeholder} </option>}
                    {Array.isArray(list) && list.map((item) => <ComboBoxItem
                        key={item[idFieldName]}
                        id={item[idFieldName]}
                        current={this.props.current == item[idFieldName]}
                        disabled={item._disabled_}
                        caption={item.caption}
                    >{item.caption}</ComboBoxItem>)}
                </select>
                {!disable.dim && <div className="wd-cb-dim">{dim}</div>}
            </div>
        );
    }
}
ComboBox.defaultProps = {
    labelName: undefined,
    id: '',
    select: -1, // id of selected
    idFieldName: 'id',
    dim: '',
    onChange: undefined,
    placeholder: '-выбрать-',
    list: [
        { id: 1, caption: 'text1' },
        { id: 2, caption: 'text2', _disabled_: 1 },
        { id: 3, caption: 'text3' },
    ],
    visible: 1,
    disabled: 0,
    disable: {
        dim: false,
    },
    addClass: '',

};
