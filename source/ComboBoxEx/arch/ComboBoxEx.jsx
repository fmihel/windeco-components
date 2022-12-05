import {
    binds, JX, ut, dvc,
} from 'fmihel-browser-lib';
import React from 'react';
import _ from 'lodash';
import Modal from '../Modal/Modal.jsx';
import ComboBoxListEx from './ComboBoxListEx.jsx';

export default class ComboBoxEx extends React.Component {
    static _global={
        off: {
            left: -1,
            top: 0,
            width: 0,
            height: 0,
            lineHeight: -1, // смещение текста, только при указании style.height
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
            mouseOnCombo: false,
        };

        binds(this, 'openList', 'closeList', 'onChange', 'onKeyDown', 'onFocusOut', 'onCreateList', 'onMouseMove', 'onMouseLeave', 'onFocusIn');
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
        if (ut.False(this.props.disabled)) {
            this.setState({ visibleList: true });
            this._reculcWordWidth();
            this.definePosition(true);
            this.createTimer();
        }
    }

    closeList() {
        this.setState({ visibleList: false, mouseOnCombo: false });
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

        if (this.props.maxListWidth === 'auto' && !dvc.mobile) {
            // в случае если еще не было выбрано ни одного пункта (isPlaceholder===true), то компонент refValue не содержит
            // класс с оформлением, поэтому необходимо определить класс первого пугкта и подставить его в refValue
            const isPlaceholder = this.refValue.current.classList.contains('wd-combobox-ex-placeholder');

            const remove = [];
            if (isPlaceholder && this.props.list.length) {
                const addClasses = ComboBoxListEx.getAddClass(this.props.list[0], { ...ComboBoxEx._global.listClasses, ...this.props.listClasses }, this.props.addClassItem).split(' ').filter((it) => it.trim());
                addClasses.map((className) => {
                    if (!this.refValue.current.classList.contains(className)) {
                        this.refValue.current.classList.add(className);
                        remove.push(className);
                    }
                });
            }

            this.props.list.map((it) => {
                this.WordWidth = Math.max(
                    this.WordWidth,
                    JX.textSize(`${it.caption}w`, {
                        parentDom: this.refValue.current,
                        attr: { padding: true },
                    }).w,
                );
            });

            remove.map((className) => this.refValue.current.classList.remove(className));
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
        // if (this.state.mouseOnCombo) this.setState({ mouseOnCombo: false });
        // console.log('out');
    }

    onFocusIn() {
        // console.log('in');
        if (!this.state.mouseOnCombo) this.setState({ mouseOnCombo: true });
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
        this.setState({ select, mouseOnCombo: false });
        this.closeList();
    }

    onCreateList(o) {
        this.list = o.sender;
    }

    onMouseLeave(o) {
        this.setState({ mouseOnCombo: false });
    }

    onMouseMove(o) {
        if (!this.state.mouseOnCombo) this.setState({ mouseOnCombo: true });
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

    getItem(id) {
        return this.props.list.find((it) => it[this.props.idFieldName] == id);
    }

    render() {
        const {
            idFieldName, placeholder, disable, dim, labelName,
            addClass, addClassItem, list, maxListHeight, listClasses: listClassesProps, style, required,
            hideBtnOnSelect, srcPath, clamp,
        } = this.props;
        const { visibleList, pos, mouseOnCombo } = this.state;
        const name = (labelName ? { id: labelName } : {});
        let value = '';
        let addClassValue = '';
        const select = this._getSelect();
        const listClasses = { ...ComboBoxEx._global.listClasses, ...listClassesProps };
        const noSelect = this.getItem(select) === undefined;
        let selected = false;
        if (noSelect) {
            value = placeholder;
            addClassValue += ' wd-combobox-ex-placeholder';
        } else {
            selected = list.find((item) => ut.eq(item[idFieldName], select));
            if (selected) {
                addClassValue += ` ${ComboBoxListEx.getAddClass(selected, listClasses, addClassItem)}`;
                value = selected.caption;
            }
        }

        let valueStyle = {};
        if ('height' in style) {
            valueStyle = {
                ...valueStyle,
                // height: style.height,
                lineHeight: `${parseInt(style.height, 10) + ComboBoxEx._global.off.lineHeight}px`,
            };
        }
        if (selected) {
            valueStyle = { ...valueStyle, ...ComboBoxListEx.getAddStyle(selected, srcPath) };
        }

        let btnStyle = {};
        if ('height' in style) {
            const bgSize = `${parseInt(style.height, 10) - 4}px`;
            btnStyle = {
                ...btnStyle,
                backgroundSize: bgSize,
                width: bgSize,
                minWidth: bgSize,
            };
        }
        if (!noSelect && hideBtnOnSelect && !mouseOnCombo && !visibleList) {
            btnStyle.display = 'none';
        }

        const focusStyle = {};
        if ('width' in style) {
            focusStyle.width = style.width;
        }
        const clampStyle = {};
        if (clamp > 0 && mouseOnCombo && this.ref) {
            const { w } = JX.pos(this.ref.current);
            if (w < clamp) {
                clampStyle.left = -(clamp - w) / 2;
                clampStyle.width = clamp;
                clampStyle.minWidth = clamp;
                clampStyle.position = 'relative';
                clampStyle.zIndex = 10000;
            }
        }
        return (
            <div
                className={`wd-combobox-ex ${addClass}`}
                ref={this.ref}
                {...name}
                style={{ ...style }}
                onMouseMove={this.onMouseMove}
                onMouseLeave={this.onMouseLeave}

            >
                <div
                    className={`wd-combobox-ex-focus ${(noSelect && required) ? 'wd-combobox-ex-require' : ''}`}
                    tabIndex="0"
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onFocusOut}
                    onFocus={this.onFocusIn}
                    ref={this.refFocus}
                    style={{ ...focusStyle, ...clampStyle }}
                >

                    <div
                        className={`wd-combobox-ex-value ${addClassValue}`}
                        onClick={this.openList}
                        title={value}
                        ref={this.refValue}
                        style={valueStyle}
                    >
                        {value}
                    </div>

                    <div
                        className="wd-combobox-ex-btn"
                        onClick={this.openList}
                        style={btnStyle}
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
                        addClassItem={addClassItem}
                        srcPath={srcPath}
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
        dim: true,
    },
    addClass: '',
    addClassItem: '',
    _forcedSelect: true, // если true то выбранный элемент в списке будет сразу отображаться в поле, false - необходимо передать props.select
    _forcedPosition: true, // включает режим доп проверки позиции выпадающего списка
    style: {},
    required: false,
    hideBtnOnSelect: false, // скрывать кнопку раскрытия, если выбран элемент
    srcPath: '',
    clamp: 0, // если ширина меньше указанногов clamp то при раскрытии
};
