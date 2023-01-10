/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import {
    binds, storage,
} from 'fmihel-browser-lib';
import { connect } from 'react-redux';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faAddressBook, faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { iEdit, iEdit16 } from './global';
import Btn from '../jsx/Btn/Btn.jsx';
import BtnIcon from '../jsx/BtnIcon/BtnIcon.jsx';
import ComboBoxEx from '../jsx/ComboBox/ComboBox.jsx';
import ComboItemIcon from '../jsx/ComboBox/ComboItemIcon.jsx';

import CheckBox from '../jsx/CheckBox/CheckBox.jsx';
import Label from '../jsx/Label/Label.jsx';
import TableFixed from '../jsx/TableFixed/TableFixed.jsx';
import ModalDialog from '../jsx/ModalDialog/ModalDialog.jsx';
import Modal from '../jsx/Modal/Modal.jsx';
import Text from '../jsx/Text/Text.jsx';
import Icon from '../jsx/Icon/Icon.jsx';
import Edit from '../jsx/Edit/Edit.jsx';
import List from '../jsx/List/List.jsx';
import Head from './jsx/Head.jsx';
import Block from './jsx/Block.jsx';
import Nav from '../jsx/Nav/Nav.jsx';
import {
    table_long2, table_long,
    combo_list1, combo_list2, combo_list3, listClasses3, fonts, listClasses4, combo_list4, combo_list5,
    icons,
} from './data.js';
import map from '../jsx/Utils/map';
import theme from '../jsx/Utils/theme';

// Icon.icons({
// [iEdit]: './media/edit.png',
// [iEdit16]: { path: './media/edit16.png' },
// });

class App extends React.Component {
    constructor(p) {
        super(p);
        const t = this;
        binds(this, 'onTheme', 'onSize',
            'onClickTable', 'onClickTableFixed',
            'OpenDialog', 'CloseDialog', 'undefTheme', 'OpenDialogEx',
            'CloseDialogEx');
        this.onTableClear = this.onTableClear.bind(this);
        this.onTableFill = this.onTableFill.bind(this);
        this.onChangeEx = this.onChangeEx.bind(this);
        this.onChangeCombo = this.onChangeCombo.bind(this);
        this.setLightTheme = this.setLightTheme.bind(this);
        this.setDarkTheme = this.setDarkTheme.bind(this);
        // общие параметры для диалогов
        const defaultDialogParam = {
            header: false,
            msg: '',
            onClickHeaderClose: this.CloseDialog,
            onClickShadow: this.CloseDialog,
            onClickFooterBtn: this.CloseDialog,
        };
        this.dialogEx = {
            ...defaultDialogParam,
            msg: 'upper..',
            height: 200,
            width: 200,
            resizable: false,
            draggable: false,
            stickTo: '#ex-btn',
            align: 'stickTo',
            onClickHeaderClose: this.CloseDialogEx,
            onClickShadow: this.CloseDialogEx,
            onClickFooterBtn: this.CloseDialogEx,
        };
        this.dialogs = {
            common: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
            },

            table: {
                ...defaultDialogParam,
                header: 'table',
                msg: '|--|',
                resizable: true,
            },

            'with btns': {
                ...defaultDialogParam,
                // header: 'text in header',
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
            },

            stickTo: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
                align: 'stickTo',
                stickTo: '#dialog-btn-stickTo',
                height: 150,
                width: 300,
                draggable: false,
            },

            stickAndDrag: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: ['ok', 'cancel'],
                align: 'stickTo',
                stickTo: '#dialog-btn-stickAndDrag',
                height: 150,
                width: 300,
                draggable: true, // by default true
                resizable: true,
                onShow() {
                    console.log('show dialog');
                },
            },
            stickToHoriz: {
                ...defaultDialogParam,
                header: 'stickTo-horiz',
                msg: 'stickTo-horiz',
                footer: ['ok', 'cancel'],
                align: 'stickTo',
                stickTo: '#dialog-btn-stickToHoriz',
                stickAlign: 'left',
                stickOffY: -20,
                stickOffX: 10,
                height: 150,
                width: 300,
                draggable: true, // by default true
                resizable: true,

            },
            extend: {
                ...defaultDialogParam,
                header: 'text in header',
                msg: 'common simple dialog',
                footer: {
                    add(o) {
                        // console.log('press add', o);
                        t.OpenDialogEx();
                    },
                    ok: {
                        onClick(o) {
                            console.log(o);
                        },
                        addClass: 'wd-primary',
                    },
                    cancel: {
                        id: 'cancel-btn',
                        caption: 'отмена',
                        addClass: 'wd-transparent',
                    },
                },
                align: 'stickTo',
                stickTo: '#dialog-btn-extend',
                height: 400,
                width: 400,
                resizable: true,
                draggable: true,
            },
            custom: {
                ...defaultDialogParam,
                align: 'custom',
                msg: 'custom',
                left: 100,
                top: 100,
                width: 200,
                height: 200,
                resizable: false,
                draggable: false,
            },

        };
        this.state = {
            theme: storage.get('theme-style', { default: 'dark' }),
            size: storage.get('theme-size', { default: 'normal' }),
            checked: 0,
            dialog: false, // 'table',
            dialogEx: false,
            modalShow: false,
            modalShow2: false,
            fields: table_long.fields,
            table: table_long.data,
            textValue: '',
            textValue2: '',
            customLeft: 100,
            customTop: 100,
            values: {

            },
            comboSelect: {

            },
            tableHeader: true,
            tableHeight: 200,
            tableFooter: 'end',
            tableSelect: [],
            listSetup: {
                2: { expand: true, active: true },
            },
        };
    }

    OpenDialogEx() {
        this.setState({ dialogEx: true });
    }

    CloseDialogEx() {
        this.setState({ dialogEx: false });
    }

    OpenDialog(name) {
        this.setState({ dialog: name });
    }

    CloseDialog() {
        this.setState({ dialog: false });
    }

    setLightTheme() {
        theme.set('light');
    }

    setDarkTheme() {
        theme.set('dark');
    }

    onTheme(o) {
        storage.set('theme-style', o.currentTarget.id);
        this.setState({ theme: o.currentTarget.id });
    }

    onSize(o) {
        storage.set('theme-size', o.currentTarget.id);
        this.setState({ size: o.currentTarget.id });
    }

    undefTheme(o) {
        storage.set('theme-style', o.currentTarget.id);
        storage.set('theme-size', o.currentTarget.id);
        this.setState({ theme: o.currentTarget.id, size: o.currentTarget.id });
    }

    onClickTable(o) {
        console.log(o);
        o.sender.select(o.row);
    }

    onClickTableFixed(o) {
        console.log(o);
        this.setState({ tableSelect: [o.row[o.aliasId]] });
    }

    onTableClear() {
        this.setState({ table: [] });
    }

    onTableFill() {
        this.setState({ table: table_long.data });
    }

    onChangeEx({ id, value }) {
        if (id) {
            this.setState((prev) => ({
                values: {
                    ...prev.values,
                    [id]: value,
                },
            }));
        }
    }

    onChangeCombo({ id, data }) {
        console.log('change combo', id, data);
        if (id) {
            this.setState((prev) => {
                const comboSelect = { ...prev.comboSelect };
                comboSelect[id] = data.id;
                return { ...prev, comboSelect };
            });
        }
    }

    render() {
        const {
            fields, table, textValue, textValue2, dialogEx, customLeft, customTop, values, comboSelect,
            tableHeader, tableHeight, tableFooter, tableSelect, listSetup,
        } = this.state;
        const dialogs = Object.keys(this.dialogs);
        const fontsName = Object.keys(fonts);
        const getItemClass = (data) => {
            if (data) {
                if ('id' in data && icons[data.id]) {
                    return icons[data.id];
                }
                return icons[0];
            }
            return '';
        };
        return (
            <div className={`${this.state.theme} ${this.state.size}`}>
                <div className="panel">
                    <span>{`${this.state.theme} / ${this.state.size}`} </span>
                    <input id="light" type="button" value="light" onClick={this.setLightTheme}/>
                    <input id="dark" type="button" value="dark" onClick={this.setDarkTheme}/>
                    {/*
                    <input id="small" type="button" value="small" onClick={this.onSize}/>
                    <input id="normal" type="button" value="normal" onClick={this.onSize}/>
                    */}
                    <input id="undef-theme" type="button" value="undef-theme" onClick={this.undefTheme}/>
                </div>
                <div className="wd-layout">

                    <Nav>
                        <span>Item1</span>
                        <Edit placeholder='search'/>
                        <span>Item2</span>
                        <span>Item3</span>
                        <span>Item4</span>
                        <span>Item5</span>
                        <Edit placeholder='search'/>
                        <span>Item3</span>
                        <span>Item4</span>
                        <span>Item5</span>
                        <span>Item3</span>
                        <span>Item4</span>
                        <span>Item5</span>
                        <Edit placeholder='search'/>
                        <span>Item4</span>
                        <span>Item5</span>
                        <span>Item4</span>
                        <Edit placeholder='search'/>
                        <span>Item4</span>
                        <span>Item5</span>
                        <span>Item4</span>
                        <Edit placeholder='search'/>
                        <span>Item4</span>
                        <span>Item5</span>
                        <span>Item4</span>
                        <Edit placeholder='search'/>
                        <span>Item4</span>
                        <span>Item5</span>
                        <span>Item4</span>
                        <span>END</span>

                    </Nav>

                    <div className='content wd-scrollbar'>
                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="List">

                            <Block>
                                <List
                                    list={
                                        [
                                            { id: 1, caption: 'item-1' },
                                            {
                                                id: 2,
                                                caption: 'item-2',
                                                childs: [
                                                    { id: 21, caption: 'item-21' },
                                                    {
                                                        id: 22,
                                                        caption: 'item-22',
                                                        childs: [
                                                            { id: 221, caption: 'item-221' },
                                                            {
                                                                id: 222,
                                                                caption: 'item-222',
                                                                childs: [
                                                                    { id: 2221, caption: 'item-2221' },
                                                                    { id: 2222, caption: 'item-2222' },
                                                                    { id: 2223, caption: 'item-2223' },

                                                                ],
                                                            },
                                                            { id: 223, caption: 'item-223' },
                                                        ],
                                                    },
                                                    { id: 23, caption: 'item-23' },
                                                ],
                                            },
                                            { id: 3, caption: 'item-3' },
                                        ]}
                                    setup={listSetup}
                                    onClick={(o) => {
                                        this.setState({
                                            listSetup: {
                                                ...map(listSetup, (val) => ({ ...val, active: false })),
                                                [o.id]: { ...listSetup[o.id], active: true, expand: !(listSetup[o.id] && listSetup[o.id].expand) },
                                            },
                                        });
                                    }}
                                />
                            </Block>
                        </Head>

                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="ComboBoxEx">
                            <Block>
                                <ComboBoxEx
                                    id='cb1'
                                    onChange={this.onChangeCombo}
                                    list = {combo_list1}
                                    select={'cb1' in comboSelect ? comboSelect.cb1 : false}
                                    required={true}
                                />
                            </Block>
                            <Block>
                                <div className="block-horiz">
                                    <ComboBoxEx
                                        id='cb2'
                                        onChange={this.onChangeCombo}
                                        list = {combo_list3}
                                        select={'cb2' in comboSelect ? comboSelect.cb2 : false}
                                        style={{ width: 100 }}
                                        addClass={'wd-clamp'}
                                    />
                                    <Edit id="ttt" style={{ width: 100 }} onKeyPress={(o) => {
                                        console.log(o);
                                    }}> text from child</Edit>
                                    <BtnIcon
                                        hint = "icon"
                                        icon={faAddressBook}
                                        addClass="wd-danger"
                                        iconClass="demo-bi-color"
                                    >ok</BtnIcon>
                                    <Btn> left</Btn>
                                </div>
                            </Block>
                            <Block>
                                <div className="block-horiz">
                                    <ComboBoxEx
                                        onChange={(o) => { console.log(o); }}
                                        list = {combo_list1}
                                        select={3}
                                        style={{
                                            width: 100,
                                            height: 43,
                                        }}
                                        styleOuter={{ lineHeight: '43px' }}
                                        addClass={'wd-clamp'}
                                        hideBtnOnSelect = {true}
                                    />
                                    <Edit id="tttt" style={{ width: 100, height: 43 }} onKeyPress={(o) => {
                                        console.log(o);
                                    }}>text from child</Edit>
                                    <Edit id="tt90" style={{ width: 90, height: 43 }} onKeyPress={(o) => {
                                        console.log(o);
                                    }}>90</Edit>
                                    <Edit id="tt20"
                                        style={{ width: 20, height: 43 }} addClass={'wd-clamp'}
                                        type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                                            console.log(o);
                                        }}>20</Edit>
                                    <Edit id="tt30" style={{ width: 30, height: 43 }} addClass={'wd-clamp'} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                                        console.log(o);
                                    }}>30</Edit>

                                    <Edit id="tt40" style={{ width: 40, height: 43 }} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                                        console.log(o);
                                    }}>40</Edit>
                                    <Edit id="tt50" style={{ width: 50, height: 43 }} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                                        console.log(o);
                                    }}>50</Edit>
                                </div>
                            </Block>

                            <Block>
                                <ComboBoxEx
                                    id='cb3'
                                    onChange={this.onChangeCombo}
                                    list = {combo_list3}
                                    select={'cb3' in comboSelect ? comboSelect.cb3 : false}
                                    ItemComponent={ComboItemIcon}
                                    onGetItemClass={getItemClass}
                                />
                            </Block>
                            <Block>
                                <Label caption="comboboxex" style={{ color: 'red' }}>
                                    <ComboBoxEx
                                        list = {combo_list2}
                                        ItemComponent={ComboItemIcon}
                                        onGetItemClass={getItemClass}
                                    />
                                </Label>
                            </Block>
                            <Block>
                                <Label caption="disabled">
                                    <ComboBoxEx list = {combo_list2} select={1} disabled={true}/>
                                </Label>
                            </Block>
                            <Block>
                                <Label caption="outer url">
                                    <ComboBoxEx
                                        listClasses={listClasses4}
                                        list = {combo_list4}
                                        select={1}
                                    />
                                </Label>
                            </Block>
                            <Block>
                                <Label caption="outer _src_">
                                    <ComboBoxEx
                                        list = {combo_list5}
                                        srcPath={'./media/combo_32/'}
                                        addClassItem={'wd-cb32-src'}
                                        select={-1}
                                    />
                                </Label>
                            </Block>
                        </Head>
                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="Dialog">
                            <Block>
                                {dialogs.map((name, key) => <Btn id={`dialog-btn-${name}`} key={key} onClick={() => { this.OpenDialog(name); }} value={name}/>)}
                            </Block>
                        </Head>
                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="Btn">
                            <Block>
                                <Btn>button</Btn>
                                <Btn addClass="wd-danger" hint="wd-danger hint">wd-danger</Btn>
                                <Btn addClass="wd-primary">wd-primary</Btn>
                                <Btn addClass="wd-transparent">wd-transparent</Btn>
                                <Btn addClass="wd-primary pic-bag">pic</Btn>
                            </Block>
                        </Head>

                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption={'BtnIcon'}>
                            <Block>
                                <Btn>left</Btn>
                                <BtnIcon>button presed test</BtnIcon>
                                <BtnIcon
                                    hint = "icon"
                                    IconComponent={Icon}
                                    icon={iEdit}
                                    addClass="wd-danger"
                                    iconClass="demo-bi-color"
                                >ok</BtnIcon>
                                <BtnIcon
                                    hint = "icon "
                                    IconComponent={FontAwesomeIcon}
                                    icon={faAddressBook}
                                    addClass="wd-danger"
                                    iconClass="demo-bi-color"
                                >ok</BtnIcon>
                                <Btn>standart</Btn>
                                <BtnIcon addClass="wd-primary">cancel</BtnIcon>
                                <BtnIcon>story</BtnIcon>
                                <BtnIcon icon={faCaretDown} style={{ width: '100px' }} hint="no text"/>
                                <BtnIcon addClass="wd-green">save</BtnIcon>
                            </Block>
                        </Head>
                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="Edit">
                            <Block> <Edit id="tt" style={{ fontSize: '1.2em' }} onKeyPress={(o) => {
                                console.log(o);
                            }}>text from child</Edit></Block>
                            <Block> <Edit type="password" placeholder="set password" style={{ height: 18, minHeight: 18 }}/></Block>
                            <Block> <Edit autoFocus value="text from value, and hint" title="title prop (hint deeprecated)"/></Block>

                            <Block> <Edit
                                id = 'edNeed'
                                value = {values.edNeed}
                                onChange = {this.onChangeEx}
                                hint="обязательный ввод"
                                placeholder="need text.."
                                required={true}
                                maxLength={10}
                            />
                            </Block>
                            <Block> <Edit value="readonly" readonly={1} /></Block>
                            <Block> <Edit value="disabled" disabled={1} visible={true}/></Block>
                            <Block> <Edit id="edph" placeholder="set text" value={values.edph} onChange={this.onChangeEx}/></Block>
                            <Block> <Label caption="label" id="myEdit100">
                                <Edit id="myEdit100" value={values.myEdit100} onChange={this.onChangeEx}/>
                            </Label></Block>
                            <Block> <Label caption="pass" id="pass"><Edit id="pass" type="password" value="set text" /></Label></Block>
                            <Block> <Label caption="readonly" id="ronl"><Edit id="ronl" value="readonly text in edit" dim={''} readonly={true}/></Label></Block>
                            <Block> <Label caption="range" id="rng" ><Edit id="rng" value={5} type='number' min={0} max={10} step={1}/></Label></Block>

                        </Head>

                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption = "TableFixed">
                            <Block>
                                <Btn onClick={this.onTableClear}>clear</Btn>
                                <Btn onClick={this.onTableFill}>fill</Btn>
                                <Btn onClick={() => { this.setState({ tableHeader: false }); }}>header no</Btn>
                                <Btn onClick={() => { this.setState({ tableHeader: 'text' }); }}>header cap</Btn>
                                <Btn onClick={() => { this.setState({ tableHeader: true }); }}>header fields</Btn>
                                <Btn onClick={() => { this.setState({ tableHeight: 200 }); }}>H=200</Btn>
                                <Btn onClick={() => { this.setState({ tableHeight: 500 }); }}>H=500</Btn>
                                <Btn onClick={() => { this.setState((prev) => ({ tableFooter: (prev.tableFooter ? false : 'end') })); }}>footer</Btn>
                            </Block>

                            <Block addClass="container-for-table-fixed" style={{ height: tableHeight }} hide={false} >
                                <TableFixed
                                    id='tab1'
                                    fields={fields}
                                    data={table}
                                    onClick={this.onClickTableFixed}
                                    header={tableHeader}
                                    footer={tableFooter}
                                    select={tableSelect}
                                />

                            </Block>
                            {/*
                        <Block addClass="container-for-table-fixed"style={{ height: 540 }}>
                            <TableFixed
                                id='tab2'
                                fields={table_long2.fields}
                                data={table_long2.data}
                                onClick={this.onClickTableFixed}
                            />
                        </Block>
                    */}
                        </Head>

                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="Text">
                            <Block>
                                <Text
                                    style={{ height: 70, width: '100%' }}
                                    placeholder="rows:4 cols:15 len:60"
                                    title="rows:4 cols:15 len:60"
                                    value={textValue2}
                                    onChange={(o) => { this.setState({ textValue2: o.value }); }}
                                    rows={4}
                                    cols={15}
                                />
                            </Block>
                            <Block>
                                <Text
                                    style={{ height: 30 }}
                                    maxLength={20}
                                    placeholder="set text, max 20 len.."
                                    title="set text, max 20 len.."
                                    value={textValue}
                                    onChange={(o) => { this.setState({ textValue: o.value }); }}
                                    required={true}
                                />
                            </Block>
                            <Block>
                                <Text
                                    readonly={true}
                                    title="readonly"
                                    value= "readonly"
                                />
                            </Block>
                            <Block>
                                <Text
                                    disabled={1}
                                    value="disabled"
                                    resize={true}
                                />
                            </Block>
                        </Head>

                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="Modal">
                            <Block>
                                <Btn onClick={() => { this.setState({ modalShow: true }); }} >show1</Btn>
                                { <Modal
                                    id="test-modal1"
                                    visible={this.state.modalShow}
                                    onClickShadow={() => {
                                        this.setState({ modalShow: false });
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 100,
                                            top: 100,
                                            width: 200,
                                            height: 200,
                                            border: '1px solid navy',
                                            background: 'gray',
                                        }}>
                                        <Btn onClick={() => { this.setState({ modalShow2: true }); }} >show2</Btn>

                                    </div>

                                </Modal>
                                }
                            </Block>
                            <Block>
                                <Btn onClick={() => { this.setState({ modalShow2: true }); }} >show2</Btn>
                                { <Modal
                                    id="test-modal2"
                                    visible={this.state.modalShow2}
                                    onClickShadow={() => {
                                        this.setState({ modalShow2: false });
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 100,
                                            top: 100,
                                            width: 200,
                                            height: 200,
                                            border: '1px solid navy',
                                            background: 'gray',
                                        }}>
                                        <Btn onClick={() => { this.setState({ modalShow: true }); }} >show1</Btn>

                                    </div>

                                </Modal>
                                }
                            </Block>
                        </Head>
                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="CheckBox">
                            <Block> <CheckBox id="ch1" checked={values.ch1} onChange={this.onChangeEx}/></Block>
                            <Block> <Label id="ckb1" caption='check'><CheckBox id="ckb1" checked={values.ckb1} onChange={this.onChangeEx}/></Label></Block>
                            <Block> <Label caption='on change'><Btn onClick={() => { this.setState({ checked: 0 }); }} >on change false</Btn></Label></Block>
                            <Block> <Label caption='on change'><CheckBox checked={this.state.checked} onChange={() => { this.setState({ checked: 1 }); }}/></Label></Block>
                            <Block> <Label id="ckb-disabled" caption='disabled'><CheckBox id="ckb-disabled" checked={true} onChange={(o) => { console.log(o); }} disabled={true}/></Label></Block>
                        </Head>
                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="Icon">
                            <Block>
                                <Icon icon={iEdit} addClass="icon-custom"/>
                                <Icon icon={iEdit16}/>
                                <Icon icon={'uncknown'} addClass="icon-custom"/>
                            </Block>
                        </Head>

                        {/*--------------------------------------------------------------------------------------------------*/}
                        <Head caption="Fonts">
                            <Block>
                                {fontsName.map((name, key) => <div key={key} className="font-line"><div>{name}</div><div className={`font-${name}`}>Короткий текст для примера.</div></div>)}
                            </Block>
                        </Head>
                        {/*--------------------------------------------------------------------------------------------------*/}
                    </div>

                </div>
                {

                    dialogs.map((name) => <ModalDialog
                        key={name}
                        id={name}
                        {...this.dialogs[name]}
                        {...(name === 'custom' ? { left: customLeft, top: customTop } : {})}
                        visible={(name === this.state.dialog)}
                    >
                        {name === 'table'
                        && <div className="test-place-table">
                            <div className="test-box1">box1</div>
                            <div className="test-box2">
                                <TableFixed id={'tab3'} {...table_long2} onClick={this.onClickTableFixed}/>
                            </div>
                        </div>

                        }
                        {name !== 'table' && this.dialogs[name].msg}
                        {name === 'extend' && <Btn id="ex-btn" onClick={this.OpenDialogEx}>open</Btn>}
                        {name === 'custom' && <Btn id="ex-btn-2" onClick={() => { this.setState({ customLeft: 300, customTop: 300 }); }}>move</Btn>}
                    </ModalDialog>)
                }

                <div id="wd-modal" style={{ position: 'absolute', left: 0, top: 0 }}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // table: state.table,
    // ui: state.ui,
});

App.defaultProps = {
};

export default connect(mapStateToProps)(App);
