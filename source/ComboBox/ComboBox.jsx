/* eslint-disable no-underscore-dangle */
import './ComboBox.scss';
import React from 'react';
import { binds, ut } from 'fmihel-browser-lib';
import thunk from 'redux-thunk';

class ComboBoxItem extends React.Component {
    render() {
        const disabled = this.props.disabled ? { disabled: true } : {};
        return <option value = {this.props.id} {...disabled}>{this.props.children}</option>;
    }
}

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
        // console.log(a.currentTarget.value);
        // console.log('onChange', this.props.hash, this.hash, a.currentTarget.value);
        this.hash = this.props.hash;
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
        // console.log('componentDidUpdate up', this.props.hash, this.hash);
        if (this.props.hash && this.hash !== this.props.hash) {
            // console.log('componentDidUpdate dn', this.props.hash, this.hash);
            this.hash = this.props.hash;
            this.setState({ select: this.props.select });
        }
    }

    render() {
        const {
            caption, idFieldName, visible, placeholder,
        } = this.props;
        const { id } = this.state;
        const display = (visible ? 'flex' : 'none');
        const list = this._normalizeData(this.props.list, idFieldName);

        const { select } = this.state;
        // if (this.props.hash && this.hash !== this.props.hash) {
        //    _select = this.props.select;
        //    this.hash = this.props.hash;
        //    console.log(id, 'hash', this.hash, 'select', _select);
        // }

        // defaultValuez={select > 0 ? select : -1 }
        return (
            <div className='up-combobox' id={id} style={{ display }}>
                <div className='combobox-caption' style={{ display: (caption ? 'block' : 'none') }}>{caption}</div>

                <select
                    className = 'combobox'

                    value={select}
                    onChange ={this.onChange}
                >
                    { typeof placeholder === 'string' && <option disabled value={-1}> {placeholder} </option>}
                    {list.map((item) => <ComboBoxItem
                        key={item[idFieldName]}
                        id={item[idFieldName]}
                        current={this.props.current == item[idFieldName]}
                        disabled={item._disabled_}
                    >{item.caption}</ComboBoxItem>)}
                </select>
            </div>
        );
    }
}
ComboBox.defaultProps = {
    id: '',
    select: -1, // id of selected
    idFieldName: 'id',
    caption: undefined,
    onChange: undefined,
    placeholder: '-выбрать-',
    list: [
        { id: 1, caption: 'text1' },
        { id: 2, caption: 'text2', _disabled_: 1 },
        { id: 3, caption: 'text3' },
    ],
    visible: 1,
    disable: 0,

};
