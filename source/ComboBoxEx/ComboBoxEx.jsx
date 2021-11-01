import {
    binds, JX, ut, dvc, DOM,
} from 'fmihel-browser-lib';
import React from 'react';
import Modal from '../Modal/Modal.jsx';
import ComboBoxListEx from './ComboBoxListEx.jsx';
// import { flex, binds } from 'fmihel-browser-lib'
export default class ComboBoxEx extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            visibleList: false,
            pos: {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            },
            select: this.props.select,
        };
        binds(this, 'openList', 'closeList', 'onChange', 'onKeyDown', 'onFocusOut', 'onCreateList');
        this.ref = React.createRef();
        this.observer = undefined;
        this.timer = undefined;
        this.list = undefined;
        this.story = {
            select: this.props.select,
        };
    }

    openList() {
        this.setState({ visibleList: true });
        this.definePosition();
        this.createTimer();
    }

    createTimer() {
        if (!this.timer && this.props._forcedPosition) {
            this.timer = setInterval(() => {
                this.definePosition();
            }, 10);
        }
    }

    destroyTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }

    definePosition() {
        const oldPos = this.state.pos;

        // console.log(DOM('.wd-combobox-ex-value', this.ref.current));
        const newPos = JX.abs(DOM('.wd-combobox-ex-focus', this.ref.current));
        if (
            (newPos.left !== oldPos.left)
            || (newPos.top !== oldPos.top)
            || (newPos.height !== oldPos.height)
            || (newPos.width !== oldPos.width)
        ) {
            this.setState({
                pos: {
                    left: newPos.x - 1, top: newPos.y, width: newPos.w, height: newPos.h,
                },
            });
        }
    }

    closeList() {
        this.setState({ visibleList: false });
        this.destroyTimer();
    }

    onKeyDown(o) {
        if (o.keyCode === 27) {
            this.closeList();
            o.preventDefault();
        }
        if (o.keyCode === 40 || o.keyCode === 38 || o.keyCode === 13) {
            if (!this.state.visibleList) {
                this.openList();
            } else {
                this.list.KeyHandle({ keyCode: o.keyCode });
            }
            o.preventDefault();
        }
    }

    onFocusOut() {
        setTimeout(() => {
            this.closeList();
        }, 100);
    }

    onChange(o) {
        const select = o.data[this.props.idFieldName];
        if (this.props.onChange) {
            if (!ut.eq(select, this._getSelect())) {
                this.props.onChange({
                    ...o,
                    sender: this,
                    select,
                });
            }
        }
        this.setState({ select });
        this.closeList();
    }

    onCreateList(o) {
        this.list = o.sender;
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга

        this.observer = new ResizeObserver(() => {
            this.definePosition();
        });
        this.observer.observe(this.ref.current);
    }

    componentWillUnmount() {
        // разовый после последнего рендеринга\
        if (this.observer) this.observer.disconnect();
        this.destroyTimer();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
        if (this.props._forcedSelect && this.story.select !== this.props.select) {
            this.story.select = this.props.select;
            this.setState({
                select: this.props.select,
            });
        }
    }

    _getSelect() {
        return this.props._forcedSelect ? this.state.select : this.props.select;
    }

    render() {
        const {
            idFieldName, placeholder, disable, dim, labelName, addClass, list, maxListHeight, listClasses,
        } = this.props;
        const { visibleList, pos } = this.state;
        const name = (labelName ? { id: labelName } : {});
        let value = '';
        let addClassValue = '';
        const select = this._getSelect();

        if (ut.eq(select, -1)) {
            value = placeholder;
        } else {
            const selected = list.find((item) => ut.eq(item[idFieldName], select));
            if (selected) {
                // addClassValue += ` ${selected.addClass}`;
                addClassValue += ` ${ComboBoxListEx.getAddClass(selected, listClasses)}`;
                value = selected.caption;
            }
        }
        return (
            <div
                className={`wd-combobox-ex ${addClass}`}
                ref={this.ref}
                {...name}

            >
                <div
                    className={'wd-combobox-ex-focus'}
                    tabIndex="0"
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onFocusOut}
                >

                    <div
                        className={`wd-combobox-ex-value ${addClassValue}`}
                        onClick={this.openList}
                    >
                        {value}
                    </div>
                    <div
                        className="wd-combobox-ex-btn"
                        onClick={this.openList}
                    >
                    </div>
                </div>

                {!disable.dim
                && <div
                    className="wd-combobox-ex-dim"
                >
                    {dim}
                </div>
                }
                {visibleList
                && <Modal onClickShadow={this.closeList}>
                    <ComboBoxListEx
                        parentPos={pos}
                        maxListHeight = {maxListHeight}
                        idFieldName={idFieldName}
                        list={list}
                        onSelect={this.onChange}
                        onCreate={this.onCreateList}
                        listClasses={listClasses}
                    />
                </Modal>}

            </div>
        );
    }
}
ComboBoxEx.defaultProps = {
    labelName: undefined,
    id: '',
    select: -1, // id of selected
    idFieldName: 'id',
    dim: 'm',
    onChange: undefined,
    placeholder: '-выбрать-',
    maxListHeight: 100,
    list: [],
    list_example: [
        { id: 1, caption: 'text1', addClass: 'wd-cbex-icon3' },
        {
            id: 2, caption: 'text2', _disabled_: 1, addClass: 'wd-cbex-icon2',
        },
        { id: 3, caption: 'text3', addClass: 'wd-cbex-icon1' },
        { id: 4, caption: 'text4', addClass: 'wd-cbex-iconno' },
    ],
    list_example2: [
        { id: 1, caption: 'text1', _indexClass_: '2' },
        { id: 2, caption: 'text2', _disabled_: 1 },
        { id: 3, caption: 'text3', _indexClass_: '3' },
        { id: 4, caption: 'text4', _indexClass_: 'none' },
        { id: 5, caption: 'text5' },
        { id: 6, caption: 'text6' },

    ],
    listClasses: {},
    listClasses_example: {
        default: 'wd-cbex-iconno',
        1: 'wd-cbex-icon1',
        2: 'wd-cbex-icon2',
        3: 'wd-cbex-icon3',
        none: 'wd-cbex-iconno',
    },
    disabled: 0,
    disable: {
        dim: false,
    },
    addClass: '',
    _forcedSelect: true, // если true то выбранный элемент в списке будет сразу отображаться в поле, false - необходимо передать props.select
    _forcedPosition: true, // включает режим доп проверки позиции выпадающего списка
};
