import React from 'react';
import {
    ut, binds, JX, dvc,
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
            mark: -1,
        };
        this.$childs = undefined;
    }

    onSelect(o) {
        if (this.props.onSelect) {
            this.props.onSelect({ ...o, sender: this });
        }
    }

    KeyHandle(o) {
        if (o.keyCode === 38) {
            this.setState((state) => {
                let mark = state.mark - 1;
                mark = (mark < 0 ? 0 : mark);

                const target = $(this.ref.current).children().eq(mark)[0];

                JX.scroll(this.ref.current,
                    target,
                    {
                        off: 10,
                        animate: 100,
                    });

                return { mark };
            });
        }
        if (o.keyCode === 40) {
            this.setState((state) => {
                let mark = state.mark + 1;
                mark = (mark > this.props.list.length - 1 ? this.props.list.length - 1 : mark);

                const target = $(this.ref.current).children().eq(mark)[0];

                JX.scroll(this.ref.current,
                    target,
                    {
                        off: 10,
                        animate: 100,
                    });

                return { mark };
            });
        }
        if (o.keyCode === 13) {
            if (this.state.mark >= 0 && this.state.mark < this.props.list.length) {
                const data = this.props.list[this.state.mark];
                if (!data._disabled_) {
                    this.onSelect({ data });
                }
            }
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
                newPos.top = parent.top - newPos.height - 0;
            } else {
                newPos.top = parent.top + parent.height - 2;
            }
            if (newPos.width > screen.w) {
                newPos.width = screen.w - 10;
            }
            if (newPos.left + newPos.width > screen.w) {
                newPos.left = screen.w - newPos.width - 5;
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

    /** признак, что курсор внутри списка */
    mouseOnList() {
        const mouse = JX.mouse();
        const list = this.state.pos;
        return (((mouse.x >= list.left) && (mouse.x <= list.left + list.width))
        && ((mouse.y >= list.top) && (mouse.y <= list.top + list.height)));
    }

    static getAddClass(item, listClasses, addClassItem) {
        const aci = (addClassItem ? (` ${addClassItem} `) : '');
        if ('addClass' in item) {
            return item.addClass + aci;
        }
        // const listClassesIndexs = Object.keys(listClasses);
        // if (listClassesIndexs.length) {
        if (('_indexClass_' in item) && (item._indexClass_ in listClasses)) {
            return aci + listClasses[item._indexClass_];
        }
        if ('default' in listClasses) return aci + listClasses.default;
        // }
        return aci;
    }

    static getAddStyle(item, srcPath) {
        const style = {};
        if ('_src_' in item) {
            style.backgroundImage = `url(${srcPath + item._src_})`;
            style.backgroundRepeat = 'no-repeat';
            style.backgroundPosition = 'left center';
        }
        return style;
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга
        this.definePosition();
        if (this.props.onCreate) this.props.onCreate({ sender: this });
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

            idFieldName, list, listClasses, addClassItem, srcPath,
        } = this.props;
        const { mark, pos } = this.state;
        const style = {
            position: 'absolute',
            ...pos,
        };

        return (
            <div
                className="wd-combobox-ex-list"
                style={style}
                ref = {this.ref}
            >
                {list.map((item, i) => <ComboBoxItemEx
                    key={item[idFieldName]}
                    id={item[idFieldName]}
                    caption={item.caption}
                    content={item.content}
                    addClass={ComboBoxListEx.getAddClass(item, listClasses, addClassItem)}
                    style={ComboBoxListEx.getAddStyle(item, srcPath)}
                    disabled={ut.True(item._disabled_)}
                    data={item}
                    onClick={this.onSelect}
                    mark={mark === i}

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
    list: [],
    list_example: [
        { id: 1, caption: 'text' },
        { id: 2, caption: 'text2', _disabled_: 1 },
        { id: 3, caption: 'text3', addClass: 'wd-cbex-icon1' },
    ],
    onSelect: undefined,
    onCreate: undefined,
    listClasses: {},
    addClassItem: undefined,
    srcPath: '',
};
