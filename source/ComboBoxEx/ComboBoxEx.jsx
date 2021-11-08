import {
    binds, JX, ut,
} from 'fmihel-browser-lib';
import React from 'react';
import _ from 'lodash';
import Modal from '../Modal/Modal.jsx';
import ComboBoxListEx from './ComboBoxListEx.jsx';
// import { flex, binds } from 'fmihel-browser-lib'
export default class ComboBoxEx extends React.Component {
    static _global={
        off: {
            left: -1,
            top: 0,
            width: 0,
            height: 0,
        },
        listClasses: {},
    };

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
            id: (this.props.id === '' ? `cbex-${ut.random_str(5)}` : this.props.id),
        };

        binds(this, 'openList', 'closeList', 'onChange', 'onKeyDown', 'onFocusOut', 'onCreateList');
        this.ref = React.createRef();
        this.refFocus = React.createRef();
        this.refValue = React.createRef();

        this.observer = undefined;
        this.timer = undefined;
        this.list = undefined;
        this.WordWidth = 0;
        this.story = {
            select: this.props.select,
            hash: undefined,
        };
    }

    /** установка глобальных настроек для обьекта */
    static global(o) {
        if (o) {
            ComboBoxEx._global = _.defaultsDeep(o, ComboBoxEx._global);
            // console.log('global', ComboBoxEx._global);
        }
        return _.cloneDeep(ComboBoxEx._global);
    }

    openList() {
        this.setState({ visibleList: true });
        this._reculcWordWidth();
        this.definePosition(true);
        this.createTimer();
    }

    closeList() {
        this.setState({ visibleList: false });
        this.destroyTimer();
    }

    createTimer() {
        if (!this.timer && this.props._forcedPosition) {
            this.timer = setInterval(() => {
                // если произошло изменение размеров или позиции
                if (this.definePosition(false, false)) {
                    this.closeList();
                }
            }, 200);
        }
    }

    destroyTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }

    /* расчет ширины по тексту */
    _reculcWordWidth() {
        this.WordWidth = 0;
        if (this.props.maxListWidth === 'auto') {
            this.props.list.map((it) => { this.WordWidth = Math.max(this.WordWidth, JX.textSize(`${it.caption}w`, { parentDom: this.refValue.current }).w); });
        }
    }

    definePosition(forced = false, setState = true) {
        if (forced || this.state.visibleList) {
            const oldPos = this.state.pos;
            const abs = JX.abs(this.refFocus.current);
            const newPos = { ...abs };

            newPos.x += ComboBoxEx._global.off.left;
            newPos.y += ComboBoxEx._global.off.top;
            newPos.w += ComboBoxEx._global.off.width;
            newPos.h += ComboBoxEx._global.off.height;

            if (this.WordWidth > newPos.w) {
                newPos.w = Math.min(this.WordWidth, JX.screen().w - 10);
            }

            if (
                (newPos.x !== oldPos.left)
                || (newPos.y !== oldPos.top)
                || (newPos.h !== oldPos.height)
                || (newPos.w !== oldPos.width)
            ) {
                if (setState) {
                    this.setState({
                        pos: {
                            left: newPos.x, top: newPos.y, width: newPos.w, height: newPos.h,
                        },
                    });
                }
                return true;
            }
        }
        return false;
    }

    onKeyDown(o) {
        if (o.keyCode === 9) {
            this.closeList();
        }
        if (o.keyCode === 27) {
            this.closeList();
            o.preventDefault();
        }
        if ([34, 33, 40, 38, 13].indexOf(o.keyCode) >= 0) {
            if (!this.state.visibleList) {
                this.openList();
            } else {
                this.list.KeyHandle({ keyCode: o.keyCode });
            }
            o.preventDefault();
        }
    }

    onFocusOut() {

    }

    onChange(o) {
        const select = o.data[this.props.idFieldName];
        if (this.props.onChange) {
            if (!ut.eq(select, this._getSelect())) {
                this.props.onChange({
                    // ...o,
                    // sender: this,
                    id: this.props.id,
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

        // this.observer = new ResizeObserver(() => {
        // this.definePosition();
        // });
        // this.observer.observe(this.ref.current);
    }

    componentWillUnmount() {
        // разовый после последнего рендеринга\
        // if (this.observer) this.observer.disconnect();
        this.destroyTimer();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
        if (this.props._forcedSelect) {
            const { story } = this;
            const { props } = this;
            if ((story.select !== props.select) || (props.hash && story.hash !== props.hash)) {
                story.select = props.select;
                story.hash = props.hash;
                this.setState({
                    select: this.props.select,
                });
            }
        }
    }

    _getSelect() {
        return this.props._forcedSelect ? this.state.select : this.props.select;
    }

    render() {
        const {
            idFieldName, placeholder, disable, dim, labelName, addClass, list, maxListHeight, listClasses: listClassesProps,
        } = this.props;
        const { visibleList, pos } = this.state;
        const name = (labelName ? { id: labelName } : {});
        let value = '';
        let addClassValue = '';
        const select = this._getSelect();
        const listClasses = { ...ComboBoxEx._global.listClasses, ...listClassesProps };
        if (ut.eq(select, -1)) {
            value = placeholder;
            addClassValue += ' wd-combobox-ex-placeholder';
        } else {
            const selected = list.find((item) => ut.eq(item[idFieldName], select));
            if (selected) {
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
                    ref={this.refFocus}
                >

                    <div
                        className={`wd-combobox-ex-value ${addClassValue}`}
                        onClick={this.openList}
                        title={value}
                        ref={this.refValue}
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
    hash: undefined,
    labelName: undefined,
    id: '',
    select: -1, // id of selected
    idFieldName: 'id',
    dim: 'm',
    onChange: undefined,
    placeholder: '-выбрать-',
    maxListHeight: 300,
    maxListWidth: 'auto', // 'fixed' || 'auto'
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
