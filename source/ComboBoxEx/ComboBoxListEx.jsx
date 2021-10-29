import React from 'react';
import {
    ut, binds, childDOM, JX, dvc,
} from 'fmihel-browser-lib';
import ComboBoxItemEx from './ComboBoxItemEx.jsx';

export default class ComboBoxListEx extends React.Component {
    constructor(p) {
        super(p);
        binds(this, 'onSelect');
        this.ref = React.createRef();
        this.state = {
            pos: {
                height: 0,
                left: 0,
                top: 0,
                width: 0,
            },
        };
        this.$childs = undefined;
    }

    onSelect(o) {
        if (this.props.onSelect) {
            this.props.onSelect({ ...o, sender: this });
        }
    }

    definePosition() {
        const parent = this.props.parentPos;
        const newPos = { ...parent, height: 0 };
        const oldPos = this.state.pos;
        const screen = JX.screen();
        if (dvc.mobile) {
            newPos.left = screen.w * 0.1;
            newPos.top = screen.h * 0.1;
            newPos.width = screen.w - screen.w * 0.2;
            newPos.height = screen.h - screen.h * 0.2;
        } else {
            this.$childs = this.$childs || $(this.ref.current).find('.wd-combobox-ex-item');
            $.each(this.$childs, (i, child) => {
                newPos.height += (child.clientHeight || 32) + 2;
            });
            newPos.height += 2;

            newPos.height = newPos.height > this.props.maxListHeight ? this.props.maxListHeight : newPos.height;

            if (parent.top + parent.height + newPos.height > screen.h) {
                newPos.top = parent.top - newPos.height - 2;
            } else {
                newPos.top = parent.top + parent.height - 2;
            }
        }

        if (
            (newPos.left !== oldPos.left)
            || (newPos.top !== oldPos.top)
            || (newPos.height !== oldPos.height)
            || (newPos.width !== oldPos.width)
        ) {
            this.setState({ pos: newPos });
        }
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга
        this.definePosition();
    }

    componentWillUnmount() {
        // разовый после последнего рендеринга
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
        this.definePosition();
    }

    render() {
        const {

            idFieldName, list,
        } = this.props;
        const style = {
            position: 'absolute',
            ...this.state.pos,
        };
        return (
            <div
                className="wd-combobox-ex-list"
                style={style}
                ref = {this.ref}
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
    parentPos: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    },
    maxListHeight: 100,
    idFieldName: 'id',
    list: [
        { id: 1, content: '<span>text</span>' },
        { id: 2, caption: 'text2', _disabled_: 1 },
        { id: 3, caption: 'text3', addClass: 'wd-cbex-icon1' },
    ],
    onSelect: undefined,
};
