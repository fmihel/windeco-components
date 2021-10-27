import React from 'react';
import { ut, binds } from 'fmihel-browser-lib';
import ComboBoxItemEx from './ComboBoxItemEx.jsx';

export default class ComboBoxListEx extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onSelect');
    }

    onSelect(o) {
        if (this.props.onSelect) {
            this.props.onSelect({ ...o, sender: this });
        }
    }

    render() {
        const {
            left, top, width, height,
            idFieldName, list,
        } = this.props;
        const style = {
            position: 'absolute',
            left,
            top,
            width,
            height,
        };
        return (
            <div
                className="wd-combobox-ex-list"
                style={style}
            >
                {list.map((item) => <ComboBoxItemEx
                    key={item[idFieldName]}
                    id={item[idFieldName]}
                    caption={item.caption}
                    content={item.content}
                    addClass={item.addClass}
                    disabled={ut.eq(item._disabled_, 1)}
                    data={item}
                    onClick={this.onSelect}
                />)}
            </div>
        );
    }
}
ComboBoxListEx.defaultProps = {

    left: 0,
    top: 0,
    width: 0,
    height: 0,

    idFieldName: 'id',
    list: [
        { id: 1, content: '<span>text</span>' },
        { id: 2, caption: 'text2', _disabled_: 1 },
        { id: 3, caption: 'text3', addClass: 'wd-cbex-icon1' },
    ],
    onSelect: undefined,
};
