import { binds, JX, ut } from 'fmihel-browser-lib';
import React from 'react';
import Modal from '../Modal/Modal.jsx';
import ComboBoxListEx from './ComboBoxListEx.jsx';
// import { flex, binds } from 'fmihel-browser-lib'
export default class ComboBoxEx extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            visibleList: true,
            posList: {
                left: 0,
                top: 0,
                width: 100,
                height: 100,
            },
        };
        binds(this, 'openList', 'closeList', 'onChange');
        this.ref = React.createRef();
        this.observer = undefined;
    }

    openList() {
        this.setState({ visibleList: true });
        this.defineListPosition();
    }

    defineListPosition() {
        const pos = JX.abs(this.ref.current);
        this.setState((state) => ({
            posList: {
                ...state.posList,
                width: pos.w,
                left: pos.x - 2,
                top: pos.y + pos.h - 2,
            },
        }));
    }

    closeList() {
        this.setState({ visibleList: false });
    }

    onChange(o) {
        console.log(o);
        if (this.props.onChange) {
            this.props.onChange({
                ...o, sender: this,
            });
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
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // каждый раз после рендеринга (кроме первого раза !)
    }

    render() {
        console.log('render');
        const {
            select, idFieldName, visible, placeholder, disable, dim, labelName, addClass, list,
        } = this.props;
        const { visibleList, posList } = this.state;
        const name = (labelName ? { id: labelName } : {});
        const display = (visible ? 'flex' : 'none');
        let value = '';
        let addClassValue = '';

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
        { id: 4, caption: 'text3', addClass: 'wd-cbex-iconno' },

    ],
    disabled: 0,
    disable: {
        dim: false,
    },
    addClass: '',
};
