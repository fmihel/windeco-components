/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import {
    binds, storage,
} from 'fmihel-browser-lib';
import { connect } from 'react-redux';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFile, faFolder, faFolderOpen, faCoffeCup, faFileCode, faAddressBook, faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import Edit from '../source/Edit/Edit.jsx';
import Btn from '../source/Btn/Btn.jsx';
import BtnIcon from '../source/BtnIcon/BtnIcon.jsx';
import ComboBox from '../source/ComboBox/ComboBox.jsx';
import ComboBoxEx from '../source/ComboBoxEx/ComboBoxEx.jsx';
import CheckBox from '../source/CheckBox/CheckBox.jsx';
import Label from '../source/Label/Label.jsx';
import Table from '../source/Table/Table.jsx';
import TableFixed from '../source/TableFixed/TableFixed.jsx';
import ModalDialog from '../source/ModalDialog/ModalDialog.jsx';
import Modal from '../source/Modal/Modal.jsx';
import Text from '../source/Text/Text.jsx';
import Icon from '../source/Icon/Icon.jsx';

import Head from './jsx/Head.jsx';
import Block from './jsx/Block.jsx';
import {
    table_long2, table_long, combo_list1, combo_list2, combo_list3, listClasses3, fonts, listClasses4, combo_list4, combo_list5,
} from './data.js';

ComboBoxEx.global({
    // listClasses: listClasses3,
    offText: {
        // y: 10,
    },
});
BtnIcon.global({
    IconComponent: FontAwesomeIcon,
    style: {
        borderRadius: '0px',
        marginLeft: '2px',
    },
});
const iEdit = 'edit';
const iEdit16 = 'edit16';

Icon.global({
    icons: {
        [iEdit]: { path: './media/edit.png', addClass: 'wd-icon' },
        [iEdit16]: { path: './media/edit16.png' },

    },
});
// Icon.icons({
// [iEdit]: './media/edit.png',
// [iEdit16]: { path: './media/edit16.png' },
// });

class App extends React.Component {
    constructor(p) {
        super(p);
        const t = this;
        binds(this, 'onTheme', 'onSize',
            'onClickTable', 'onClickTableFixed', 'OpenDialog', 'CloseDialog', 'undefTheme', 'OpenDialogEx', 'CloseDialogEx');
        this.onTableClear = this.onTableClear.bind(this);
        this.onTableFill = this.onTableFill.bind(this);
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
            fields: table_long.fields,
            table: table_long.data,
            textValue: '',
            textValue2: '',
            customLeft: 100,
            customTop: 100,
            expandCombo: false,

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

    onTheme(o) {
        storage.set('theme-style', o.currentTarget.id); q;
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
        console.log(o.row);
        o.sender.select(o.row);
    }

    onTableClear() {
        this.setState({ table: [] });
    }

    onTableFill() {
        this.setState({ table: table_long.data });
    }

    render() {
        const {
            fields, table, textValue, textValue2, dialogEx, customLeft, customTop,
        } = this.state;
        const dialogs = Object.keys(this.dialogs);
        const fontsName = Object.keys(fonts);

        return (
            <div className={`${this.state.theme} ${this.state.size}`}>
                <div className="panel">
                    <span>{`${this.state.theme} / ${this.state.size}`} </span>
                    <input id="light" type="button" value="light" onClick={this.onTheme}/>
                    <input id="dark" type="button" value="dark" onClick={this.onTheme}/>
                    <input id="small" type="button" value="small" onClick={this.onSize}/>
                    <input id="normal" type="button" value="normal" onClick={this.onSize}/>
                    <input id="undef-theme" type="button" value="undef-theme" onClick={this.undefTheme}/>
                </div>
                <div className='content wd-scrollbar'>
                    {/*--------------------------------------------------------------------------------------------------*/}
                    <Head caption="Abs position">
                        <Block addClass="abs-pos"> <Edit
                            disable={{ dim: true }}
                            style={
                                {
                                    position: 'absolute',
                                    left: 540,
                                    top: -75,
                                    // border: '1px dashed lime',
                                    width: 57,
                                    height: 16,
                                }
                            }>abs position</Edit></Block>

                        <Block addClass="abs-pos"> <CheckBox style={
                            {
                                position: 'absolute',
                                left: 350,
                                top: -75,
                                // border: '1px dashed lime',
                                width: 14,
                                height: 14,
                            }
                        }/></Block>
                        <Block addClass="abs-pos"> <ComboBoxEx
                            list = {combo_list3}
                            listClasses={listClasses3}
                            disable={{ dim: true }}
                            select={3}
                            clamp={200}
                            style={
                                {
                                    position: 'absolute',
                                    left: 380,
                                    top: -75,
                                    // border: '1px dashed lime',
                                    height: 16,
                                    width: 150,

                                }
                            }/>
                        </Block>
                    </Head>
                    {/*--------------------------------------------------------------------------------------------------*/}
                    <Head caption="ComboBoxEx">
                        <Block>
                            <div className="block-horiz">
                                <ComboBoxEx
                                    style={{ height: 18, width: '80%' }}
                                    onChange={(o) => { console.log(o); this.setState({ expandCombo: false }); }}
                                    onClose={() => { this.setState({ expandCombo: false }); }}
                                    list = {combo_list1}
                                    required={true}

                                    expand = {this.state.expandCombo}
                                />
                                <Btn onClick={() => { this.setState({ expandCombo: true }); }}>expand</Btn>
                            </div>
                        </Block>
                        <Block>
                            <div className="block-horiz">
                                <ComboBoxEx
                                    onChange={(o) => { console.log(o); }}
                                    list = {combo_list3}
                                    listClasses={listClasses3}
                                    disable={{ dim: true }}
                                    select={3}
                                    style={{ width: 100 }}
                                    clamp={150}
                                />
                                <Edit id="ttt" style={{ width: 100 }} disable={{ dim: true }} onKeyPress={(o) => {
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
                                    list = {combo_list3}
                                    disable={{ dim: true }}
                                    select={3}
                                    style={{ width: 100, height: 43, textAlign: 'center' }}
                                    clamp={150}
                                    hideBtnOnSelect = {true}
                                />
                                <Edit id="tttt" style={{ width: 100, height: 43 }} disable={{ dim: true }} onKeyPress={(o) => {
                                    console.log(o);
                                }}>text from child</Edit>
                                <Edit id="tt90" style={{ width: 90, height: 43 }} disable={{ dim: true }} onKeyPress={(o) => {
                                    console.log(o);
                                }}>90</Edit>
                                <Edit id="tt20" style={{ width: 20, height: 43 }} disable={{ dim: true }} clamp={50} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                                    console.log(o);
                                }}>20</Edit>
                                <Edit id="tt30" style={{ width: 30, height: 43 }} disable={{ dim: true }} clamp={50} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                                    console.log(o);
                                }}>30</Edit>

                                <Edit id="tt40" style={{ width: 40, height: 43 }} disable={{ dim: true }} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                                    console.log(o);
                                }}>40</Edit>
                                <Edit id="tt50" style={{ width: 50, height: 43 }} disable={{ dim: true }} type='number' min={0} max={10} step={1} onKeyPress={(o) => {
                                    console.log(o);
                                }}>50</Edit>
                            </div>
                        </Block>

                        <Block>
                            <ComboBoxEx
                                onChange={(o) => { console.log(o); }}
                                list = {combo_list3}
                                listClasses={listClasses3}
                                disable={{ dim: true }}
                                select={3}
                            />
                        </Block>
                        <Block>
                            <Label caption="comboboxex" style={{ color: 'red' }}>
                                <ComboBoxEx list = {combo_list2} disable={{ dim: false }} addClassItem={'wd-cb32-src'}/>
                            </Label>
                        </Block>
                        <Block>
                            <Label caption="disabled">
                                <ComboBoxEx list = {combo_list2} disable={{ dim: false }} select={1} disabled={'true'}/>
                            </Label>
                        </Block>
                        <Block>
                            <Label caption="outer url">
                                <ComboBoxEx
                                    listClasses={listClasses4}
                                    list = {combo_list4}
                                    disable={{ dim: false }}
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
                                    disable={{ dim: false }}
                                    select={-1}

                                />
                            </Label>
                        </Block>
                    </Head>
                    {/*--------------------------------------------------------------------------------------------------*/}
                    <Head caption="Edit">
                        <Block> <Edit id="tt" style={{ fontSize: '1.2em' }}onKeyPress={(o) => {
                            console.log(o);
                        }}> text from child</Edit></Block>
                        <Block> <Edit type="password" placeholder="set password" disable={{ dim: true }} style={{ height: 18 }}/></Block>
                        <Block> <Edit autoFocus value="text from value, and hint" hint="hint prop"/></Block>
                        <Block> <Edit
                            value=""
                            hint="обязательный ввод"
                            placeholder="need text.."
                            required={true}
                            maxLength={10}
                            onInit={(component) => { this.EditRequired = component; }}
                            onKeyDown={(o) => { console.log('down', o); }}
                            onKeyUp={(o) => { console.log('up', o); }}
                        />
                        </Block>
                        <Block> <Edit value="disabled" disabled={1} /></Block>
                        <Block> <Edit placeholder="set text" disable={{ dim: true }}/></Block>
                        <Block> <Label caption="label" id="myEdit100"><Edit value="set text" disable={{ dim: true }}/></Label></Block>
                        <Block> <Label caption="pass" id="pass"><Edit type="password" value="set text" disable={{ dim: true }}/></Label></Block>
                        <Block> <Label caption="readonly"><Edit value="readonly text in edit" dim={''} readonly={true}/></Label></Block>
                        <Block> <Label caption="range"><Edit value={5} dim={''} type='number' min={1} max={10} step={1}/></Label></Block>
                        <Block> <Btn onClick={() => { this.EditRequired.focus(); }}>focus to required</Btn></Block>
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

                    <Head caption="Dialog">
                        <Block>
                            {dialogs.map((name, key) => <Btn id={`dialog-btn-${name}`} key={key} onClick={() => { this.OpenDialog(name); }} value={name}/>)}
                        </Block>
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
                    <Head caption="Text">
                        <Block>
                            <Text
                                style={{ height: 70 }}
                                placeholder="rows:4 cols:15 len:60  "
                                hint="hint"
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
                                hint="hint"
                                value={textValue}
                                onChange={(o) => { this.setState({ textValue: o.value }); }}
                                required={true}
                            />
                        </Block>
                        <Block>
                            <Text
                                readonly={true}
                                hint="readonly"
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
                    <Head caption="Fonts">
                        <Block>
                            {fontsName.map((name, key) => <div key={key} className="font-line"><div>{name}</div><div className={`font-${name}`}>Короткий текст для примера.</div></div>)}
                        </Block>
                    </Head>
                    {/*--------------------------------------------------------------------------------------------------*/}
                    <Head caption="CheckBox">
                        <Block> <CheckBox checked={true}/></Block>
                        <Block> <Label caption='check'><CheckBox id="ckb1" onChange={(o) => { console.log(o); }}/></Label></Block>
                        <Block> <Label caption='on change'><Btn onClick={() => { this.setState({ checked: 0 }); }} >on change false</Btn></Label></Block>
                        <Block> <Label caption='on change'><CheckBox checked={this.state.checked} asRadio={1} onChange={() => { this.setState({ checked: 1 }); }}/></Label></Block>
                        <Block> <Label caption='disabled'><CheckBox id="ckb-disabled" checked={true} onChange={(o) => { console.log(o); }} disabled={true}/></Label></Block>
                    </Head>
                    {/*--------------------------------------------------------------------------------------------------*/}
                    <Head caption = "TableFixed">
                        <Block>
                            <Btn onClick={this.onTableClear}>clear</Btn>
                            <Btn onClick={this.onTableFill}>fill</Btn>
                        </Block>

                        <Block addClass="table-fixed-height">
                            <TableFixed
                                fields={fields}
                                data={table}
                                onClick={this.onClickTableFixed}
                            />
                        </Block>
                    </Head>
                    {/*--------------------------------------------------------------------------------------------------*/}
                    <Head caption = "ComboBox">
                        <Block> <ComboBox /></Block>
                        <Block> <Label caption="combobox"><ComboBox disable={{ dim: false }}/></Label></Block>
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
                    <Head caption="Table">
                        <Block> <Table onClick={this.onClickTable}/></Block>
                    </Head>
                    {/*--------------------------------------------------------------------------------------------------*/}
                    <Head caption="Modal">
                        <Block>
                            <Btn onClick={() => { this.setState({ modalShow: true }); }} >show</Btn>
                            {this.state.modalShow
                        && <Modal
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
                                <Btn >btn on modal 1</Btn>
                                <Btn >btn on modal 2</Btn>
                            </div>
                        </Modal>
                            }
                        </Block>
                    </Head>
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
                                <TableFixed {...table_long2} onClick={this.onClickTableFixed}/>
                            </div>
                        </div>

                        }
                        {name !== 'table' && this.dialogs[name].msg}
                        {name === 'extend' && <Btn id="ex-btn" onClick={this.OpenDialogEx}>open</Btn>}
                        {name === 'custom' && <Btn id="ex-btn-2" onClick={() => { this.setState({ customLeft: 300, customTop: 300 }); }}>move</Btn>}
                    </ModalDialog>)
                }
                {/* <ModalDialog
                    {...this.dialogEx}
                    visible={dialogEx}
                >
                    {this.dialogEx.msg}
            </ModalDialog> */}

                <div id="wd-modal" >

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
