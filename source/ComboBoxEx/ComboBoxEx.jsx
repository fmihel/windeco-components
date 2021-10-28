import { binds, JX, ut } from 'fmihel-browser-lib';
import React from 'react';
import Modal from '../Modal/Modal.jsx';
import ComboBoxListEx from './ComboBoxListEx.jsx';
// import { flex, binds } from 'fmihel-browser-lib'
export default class ComboBoxEx extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            visibleList: false,
            posList: {
                left: 0,
                top: 0,
                width: 100,
                height: 100,
            },
            select: this.props.select,
        };
        binds(this, 'openList', 'closeList', 'onChange');
        this.ref = React.createRef();
        this.observer = undefined;
        this.timer = undefined;
        this.story = {
            select: this.props.select,
        };
    }

    openList() {
        this.setState({ visibleList: true });
        this.defineListPosition();
        this.createTimer();
    }

    createTimer() {
        if (!this.timer && this.props._forcedPosition) {
            this.timer = setInterval(() => {
                this.defineListPosition();
            }, 10);
        }
    }

    destroyTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = undefined;
        }
    }

    defineListPosition() {
        const oldPos = this.state.posList;
        const pos = JX.abs(this.ref.current);
        const newPos = {
            ...oldPos,
            width: pos.w,
            left: pos.x - 2,
            top: pos.y + pos.h - 2,
        };
        if (
            (newPos.left !== oldPos.left)
            || (newPos.top !== oldPos.top)
            || (newPos.height !== oldPos.height)
            || (newPos.width !== oldPos.width)
        ) this.setState({ posList: newPos });
    }

    closeList() {
        this.setState({ visibleList: false });
        this.destroyTimer();
    }

    onChange(o) {
        if (this.props.onChange) {
            const select = o.data[this.props.idFieldName];
            if (!ut.eq(select, this._getSelect())) {
                this.props.onChange({
                    ...o,
                    sender: this,
                    select,
                });
                this.setState({ select });
            }
        }
        this.closeList();
    }

    componentDidMount() {
        // разовый вызов после первого рендеринга

        this.observer = new ResizeObserver(() => {
            this.defineListPosition();
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
            idFieldName, visible, placeholder, disable, dim, labelName, addClass, list,
        } = this.props;
        const { visibleList, posList } = this.state;
        const name = (labelName ? { id: labelName } : {});
        // const display = (visible ? 'flex' : 'none');
        let value = '';
        let addClassValue = '';
        const select = this._getSelect();

        if (ut.eq(select, -1)) {
            value = placeholder;
        } else {
            const selected = list.find((item) => ut.eq(item[idFieldName], select));
            if (selected) {
                addClassValue += ` ${selected.addClass}`;
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
                {visibleList
                && <Modal onClickShadow={this.closeList}>
                    <ComboBoxListEx
                        {...posList}
                        idFieldName={idFieldName}
                        list={list}
                        onSelect={this.onChange}
                    />
                </Modal>}

            </div>
        );
    }
}
ComboBoxEx.defaultProps = {
    labelName: undefined,
    id: '',
    select: 1, // id of selected
    idFieldName: 'id',
    dim: '',
    onChange: undefined,
    placeholder: '-выбрать-',

    list: [
        { id: 1, caption: 'text1', addClass: 'wd-cbex-icon3' },
        {
            id: 2, caption: 'text2', _disabled_: 1, addClass: 'wd-cbex-icon2',
        },
        { id: 3, caption: 'text3', addClass: 'wd-cbex-icon1' },
        { id: 4, caption: 'text4', addClass: 'wd-cbex-iconno' },

    ],
    disabled: 0,
    disable: {
        dim: false,
    },
    addClass: '',
    _forcedSelect: true, // если true то выбранный элемент в списке будет сразу отображаться в поле, false - необходимо передать props.select
    _forcedPosition: false, // включает режим доп проверки позиции выпадающего списка
};
